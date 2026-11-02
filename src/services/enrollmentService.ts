import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface EnrollmentRequest {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  course_slug: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  upi_reference?: string;
  student_notes?: string;
  requested_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

const LOCAL_STORAGE_REQUESTS_KEY = 'rootaccess_enrollment_requests';

function getLocalRequests(): EnrollmentRequest[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REQUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalRequests(reqs: EnrollmentRequest[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_REQUESTS_KEY, JSON.stringify(reqs));
  } catch (err) {
    console.error('Failed to save local enrollment requests:', err);
  }
}

export const enrollmentService = {
  // Submit or update a student's enrollment request
  async submitRequest(params: {
    userId: string;
    userEmail: string;
    userName: string;
    courseSlug: string;
    courseTitle: string;
    upiReference?: string;
    studentNotes?: string;
  }): Promise<{ success: boolean; error?: string; request?: EnrollmentRequest }> {
    const normalizedSlug = params.courseSlug === 'manual-testing' ? 'manual-qa-fundamentals' : params.courseSlug;

    const newRequest: EnrollmentRequest = {
      id: `req-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      user_id: params.userId,
      user_email: params.userEmail,
      user_name: params.userName,
      course_slug: normalizedSlug,
      course_title: params.courseTitle,
      status: 'pending',
      upi_reference: params.upiReference || '',
      student_notes: params.studentNotes || '',
      requested_at: new Date().toISOString(),
    };

    // Save locally
    const existing = getLocalRequests();
    const filtered = existing.filter((r) => !(r.user_id === params.userId && r.course_slug === normalizedSlug));
    saveLocalRequests([newRequest, ...filtered]);

    // Sync to Supabase if configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('enrollment_requests')
          .upsert(
            {
              user_id: params.userId,
              user_email: params.userEmail,
              user_name: params.userName,
              course_slug: normalizedSlug,
              course_title: params.courseTitle,
              status: 'pending',
              upi_reference: params.upiReference || '',
              student_notes: params.studentNotes || '',
              requested_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,course_slug' }
          )
          .select()
          .maybeSingle();

        if (error) {
          console.warn('Supabase enrollment_requests upsert warning:', error.message);
        } else if (data) {
          return { success: true, request: data as EnrollmentRequest };
        }
      } catch (err: any) {
        console.warn('Network error syncing enrollment request:', err.message);
      }
    }

    return { success: true, request: newRequest };
  },

  // Get active student request for a specific course
  async getStudentRequest(userId: string, courseSlug: string): Promise<EnrollmentRequest | null> {
    const normalizedSlug = courseSlug === 'manual-testing' ? 'manual-qa-fundamentals' : courseSlug;

    // Check local storage first
    const local = getLocalRequests().find((r) => r.user_id === userId && r.course_slug === normalizedSlug);

    if (isSupabaseConfigured) {
      try {
        const { data } = await supabase
          .from('enrollment_requests')
          .select('*')
          .eq('user_id', userId)
          .eq('course_slug', normalizedSlug)
          .maybeSingle();

        if (data) {
          return data as EnrollmentRequest;
        }
      } catch {
        // fallback to local
      }
    }

    return local || null;
  },

  // Admin: Get all requests
  async getAllRequests(): Promise<EnrollmentRequest[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('enrollment_requests')
          .select('*')
          .order('requested_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // Merge with any local ones
          const remoteList = data as EnrollmentRequest[];
          return remoteList;
        }
      } catch (err) {
        console.warn('Failed to fetch from supabase enrollment_requests:', err);
      }
    }

    return getLocalRequests();
  },

  // Admin: Approve request and grant course enrollment (with optional UTR / notes)
  async approveRequest(
    requestId: string,
    adminEmail: string,
    updatedUpiRef?: string,
    adminNotes?: string
  ): Promise<{ success: boolean; error?: string }> {
    // 1. Find request
    let target: EnrollmentRequest | null = null;
    const local = getLocalRequests();
    target = local.find((r) => r.id === requestId) || null;

    if (isSupabaseConfigured) {
      try {
        const { data } = await supabase
          .from('enrollment_requests')
          .select('*')
          .eq('id', requestId)
          .maybeSingle();
        if (data) target = data as EnrollmentRequest;
      } catch {
        // fallback
      }
    }

    if (!target) {
      return { success: false, error: 'Request not found' };
    }

    const finalUpiRef = updatedUpiRef !== undefined ? updatedUpiRef.trim() : (target.upi_reference || '');
    const finalNotes = adminNotes !== undefined ? adminNotes.trim() : (target.student_notes || '');

    // 2. Mark request as approved
    const updatedLocal = local.map((r) =>
      r.id === requestId
        ? {
            ...r,
            status: 'approved' as const,
            upi_reference: finalUpiRef,
            student_notes: finalNotes,
            reviewed_at: new Date().toISOString(),
            reviewed_by: adminEmail,
          }
        : r
    );
    saveLocalRequests(updatedLocal);

    // 3. Grant course access to target user in public.profiles
    const courseToGrant = target.course_slug;
    const targetUserId = target.user_id;

    if (isSupabaseConfigured) {
      try {
        // Update request row
        await supabase
          .from('enrollment_requests')
          .update({
            status: 'approved',
            upi_reference: finalUpiRef,
            student_notes: finalNotes,
            reviewed_at: new Date().toISOString(),
            reviewed_by: adminEmail,
          })
          .eq('id', requestId);

        // Fetch existing enrolled courses for this student
        const { data: profile } = await supabase
          .from('profiles')
          .select('enrolled_courses')
          .eq('id', targetUserId)
          .maybeSingle();

        const currentEnrolled: string[] = profile?.enrolled_courses || [];
        if (!currentEnrolled.includes(courseToGrant)) {
          const updated = [...currentEnrolled, courseToGrant];
          await supabase
            .from('profiles')
            .update({
              enrolled_courses: updated,
              updated_at: new Date().toISOString(),
            })
            .eq('id', targetUserId);
        }
      } catch (err: any) {
        console.error('Error granting enrollment in Supabase:', err);
      }
    }

    // Update local storage progress for target user as well
    try {
      const userStorageKey = `rootaccess_progress_${targetUserId}`;
      const userProgressRaw = localStorage.getItem(userStorageKey);
      if (userProgressRaw) {
        const parsed = JSON.parse(userProgressRaw);
        const enrolled = parsed.enrolledCourses || [];
        if (!enrolled.includes(courseToGrant)) {
          parsed.enrolledCourses = [...enrolled, courseToGrant];
          localStorage.setItem(userStorageKey, JSON.stringify(parsed));
        }
      }
    } catch {
      // ignore
    }

    return { success: true };
  },

  // Admin: Reject request
  async rejectRequest(requestId: string, adminEmail: string): Promise<{ success: boolean; error?: string }> {
    const local = getLocalRequests();
    const updated = local.map((r) =>
      r.id === requestId
        ? { ...r, status: 'rejected' as const, reviewed_at: new Date().toISOString(), reviewed_by: adminEmail }
        : r
    );
    saveLocalRequests(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('enrollment_requests')
          .update({
            status: 'rejected',
            reviewed_at: new Date().toISOString(),
            reviewed_by: adminEmail,
          })
          .eq('id', requestId);
      } catch (err: any) {
        console.warn('Error rejecting request in Supabase:', err.message);
      }
    }

    return { success: true };
  },

  // Admin: Directly grant access to a student by email without prior request (with UTR & notes)
  async directGrantByEmail(
    email: string,
    courseSlug: string,
    adminEmail: string,
    upiReference?: string,
    notes?: string
  ): Promise<{ success: boolean; message: string }> {
    const normalizedSlug = courseSlug === 'manual-testing' ? 'manual-qa-fundamentals' : courseSlug;
    const finalUpiRef = upiReference ? upiReference.trim() : '';
    const finalNotes = notes ? notes.trim() : 'Directly granted by administrator';

    if (isSupabaseConfigured) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, email, full_name, enrolled_courses')
          .eq('email', email.trim().toLowerCase())
          .maybeSingle();

        if (error || !profile) {
          return { success: false, message: `No registered account found with email: ${email}` };
        }

        const currentEnrolled: string[] = profile.enrolled_courses || [];
        const isAlreadyEnrolled = currentEnrolled.includes(normalizedSlug);

        if (!isAlreadyEnrolled) {
          const updated = [...currentEnrolled, normalizedSlug];
          await supabase
            .from('profiles')
            .update({
              enrolled_courses: updated,
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id);
        }

        // Upsert approved request with UTR
        await supabase.from('enrollment_requests').upsert({
          user_id: profile.id,
          user_email: profile.email,
          user_name: profile.full_name,
          course_slug: normalizedSlug,
          course_title: normalizedSlug,
          status: 'approved',
          upi_reference: finalUpiRef,
          student_notes: finalNotes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: adminEmail,
        }, { onConflict: 'user_id,course_slug' });

        return {
          success: true,
          message: `Successfully granted "${normalizedSlug}" to ${profile.full_name} (${profile.email})${finalUpiRef ? ` [UTR: ${finalUpiRef}]` : ''}!`,
        };
      } catch (err: any) {
        return { success: false, message: `Error: ${err.message}` };
      }
    }

    return { success: false, message: 'Database not connected.' };
  },

  // Admin: Revoke specific course access from a user
  async revokeAccess(userId: string, courseSlug: string): Promise<{ success: boolean; message: string }> {
    const normalizedSlug = courseSlug === 'manual-testing' ? 'manual-qa-fundamentals' : courseSlug;

    if (isSupabaseConfigured) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('enrolled_courses')
          .eq('id', userId)
          .maybeSingle();

        if (profile) {
          const updated = (profile.enrolled_courses || []).filter((s: string) => s !== normalizedSlug);
          await supabase
            .from('profiles')
            .update({
              enrolled_courses: updated,
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }

        await supabase
          .from('enrollment_requests')
          .delete()
          .eq('user_id', userId)
          .eq('course_slug', normalizedSlug);

        // Update local storage
        const local = getLocalRequests();
        saveLocalRequests(local.filter((r) => !(r.user_id === userId && r.course_slug === normalizedSlug)));

        return { success: true, message: `Access to "${normalizedSlug}" has been revoked.` };
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    }

    const local = getLocalRequests();
    saveLocalRequests(local.filter((r) => !(r.user_id === userId && r.course_slug === normalizedSlug)));
    return { success: true, message: 'Access revoked locally.' };
  },

  // Admin: Revoke ALL course access from a user
  async revokeAllAccess(userId: string): Promise<{ success: boolean; message: string }> {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('profiles')
          .update({
            enrolled_courses: [],
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);

        await supabase
          .from('enrollment_requests')
          .delete()
          .eq('user_id', userId);

        const local = getLocalRequests();
        saveLocalRequests(local.filter((r) => r.user_id !== userId));

        return { success: true, message: 'All course access revoked for this student.' };
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    }

    const local = getLocalRequests();
    saveLocalRequests(local.filter((r) => r.user_id !== userId));
    return { success: true, message: 'All course access revoked locally.' };
  },

  // Admin: Revoke access by student email
  async revokeAccessByEmail(email: string, courseSlug?: string): Promise<{ success: boolean; message: string }> {
    if (isSupabaseConfigured) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, email, enrolled_courses')
          .eq('email', email.trim().toLowerCase())
          .maybeSingle();

        if (error || !profile) {
          return { success: false, message: `No registered account found with email: ${email}` };
        }

        if (!courseSlug || courseSlug === 'all') {
          return this.revokeAllAccess(profile.id);
        } else {
          return this.revokeAccess(profile.id, courseSlug);
        }
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    }
    return { success: false, message: 'Database not connected.' };
  },
};
