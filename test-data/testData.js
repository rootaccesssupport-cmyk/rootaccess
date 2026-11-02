/**
 * Reusable, non-sensitive test data for RootAccess end-to-end tests
 */

export const homeTestData = {
  pageTitle: /RootAccess/i,
  heroHeading: /Practical tech skills/i,
  heroSubtextSnippet: 'RootAccess is built for everyone in tech',
  featuredTracks: [
    {
      title: 'DevOps & Cloud Engineering',
      courseName: 'DevOps Engineering — From Fundamentals to Practical Projects',
      expectedUrlSnippet: '/courses/devops-engineering',
    },
    {
      title: 'Automation Testing Foundations',
      courseName: 'Playwright Automation with JavaScript + AI',
      expectedUrlSnippet: '/courses/playwright-automation',
    },
    {
      title: 'Manual Testing',
      courseName: 'Fundamentals & Defect Lifecycle',
      expectedUrlSnippet: '/courses/manual-qa-fundamentals',
    },
    {
      title: 'SQL for Software Testers',
      courseName: 'SQL & Database Audits for Engineers & Testers',
      expectedUrlSnippet: '/courses/sql-for-qa-engineers',
    },
    {
      title: 'API Testing with Postman',
      courseName: 'RESTful API Testing & Test Automation with Postman',
      expectedUrlSnippet: '/courses/api-testing-postman',
    },
    {
      title: 'Interview & Resume Strategy',
      courseName: 'Tech Interview Mastery & Scenario Playbook',
      expectedUrlSnippet: '/courses/qa-interview-mastery',
    },
  ],
  sampleFaq: {
    question: 'Do I need prior coding experience or a Computer Science degree?',
    answerSnippet: 'RootAccess starts with fundamental manual QA and problem-solving concepts',
  },
  secondFaq: {
    question: 'How is RootAccess different from typical video courses?',
    answerSnippet: 'Most platforms offer passive video watching where learners quickly forget what they saw',
  },
};
