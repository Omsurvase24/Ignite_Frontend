const data = [
  {
    id: 1,
    title: 'Hackathon',
    image: '/events/hackathon.png',
    data: [
      {
        intro: [
          `It is a 9-hour tech hackathon event to develop innovative solutions using technology. Work with like-minded individuals to develop solutions that address real-world problems such as cybersecurity, artificial intelligence, blockchain, and more. The event is open to all college students, and you'll have access to mentors and resources to help you bring your ideas to life. So form a team, and let's use coding for change to make a positive impact on the world!
          `,
          'Fees structure Rs. 150 (per person)',
        ],
        rules: [
          'Teams: Each team should consist of a minimum of 2 and a maximum of 4 members.',
          'Project: Teams must create a project that meets the theme of the hackathon. The project must be original and must not have been previously submitted to any other hackathon.',
          'Code: All code must be written during the hackathon. Teams are not allowed to use code from pre-existing projects or code written by other people who are not on their team. However, teams can use third-party libraries, APIs, and other tools that are freely available.',
          'Technology: There are no limitations on the technologies that can be used to build the project. Teams can use any language, platform, or framework.',
          'Presentation: Each team must present their project to the judges at the end of the hackathon. The presentation should include a demo of the project, an explanation of the technology used, and a summary of the features and benefits of the project.',
          'Judging: Projects will be judged on the basis of their idea, execution, feasibility, usability, and development process. Judges will be looking for innovative and practical solutions that demonstrate technical excellence and creativity.',
          'Conduct: Participants are expected to behave professionally and respectfully towards each other and the judges. Any behavior that is considered inappropriate or disruptive will result in disqualification.',
          'Intellectual Property: Each team owns the intellectual property rights to their project. However, by participating in the hackathon, teams agree to allow the organizers to use their project for promotional and educational purposes.',
        ],
        rounds: [
          {
            roundNo: 1,
            roundName: 'Hackathon',
            roundDesc: [
              'The hackathon is a tech competition where teams of up to 4 members will have 9 hours to build a full-fledged app with a working backend and a decent frontend.',
              'There are no limitations on the technologies used, so participants can use any language, platform, or framework to build their app.',
              'Teams will be judged on the basis of their idea, their execution, feasibility of the project, usability, and overall development process. Judges will be looking for innovative and practical solutions that demonstrate technical excellence and creativity.',
              'The final presentation is a crucial part of the competition. Participants will have to present their idea at the end of the hackathon with appropriate technological details. The presentation should include a demo of the app, an explanation of the technology used, and a summary of the features and benefits of the app.',
              `The judging criteria will be based on the following:
                Idea (originality, creativity, and potential impact)
                Execution (quality of the app, use of appropriate technologies, and functionality)
                Feasibility (realistic and practical application of the idea)
                Usability (user experience and interface design)
                Development Process (quality of the code, documentation, and teamwork)
              `,
              'We hope this brief provides a clear understanding of the rules, expectations, and goals of the hackathon. We wish all the participants good luck and look forward to seeing the innovative solutions they will create!',
            ],
          },
        ],
      },
    ],
  },

  {
    id: 2,
    title: 'Mock Placement',
    image: '/events/mockplacement.png',
    data: [
      {
        intro: [
          'It gives a platform to experience the placement event.',
          'It will help you to find out what is the placement procedure and where do you stand.',
          'Candidates will be participating individually.',
          'Fees structure Rs. 30 (per person)',
        ],
        rules: [
          'No internet access for any rounds.',
          'Use of calculator is allowed',
          'If anyone found cheating, he will be immediately disqualified.',
          'Final decisions will rest with the organizers.',
        ],
        rounds: [
          {
            roundNo: 1,
            roundName: 'Aptitude test',
            roundDesc: [
              'It is a MCQ test in which participants will be given 30 questions(Based on aptitude topics)',
              'The participants will be given 30 minutes to solve the maximum possible questions.',
              'The participants who will get the maximum score will be selected for the next round.',
            ],
          },
          {
            roundNo: 2,
            roundName: 'Group discussion',
            roundDesc: [
              'One topic will be given to group of 3-5 candidates.',
              'The participants will be given 3 minutes to prepare.',
              'According to performance top 2 candidates from each group will be selected for the next round.',
            ],
          },
          {
            roundNo: 3,
            roundName: 'Technical Interview',
            roundDesc: [
              'The interviewer will conduct the technical round',
              'It will be based on C, C++ & Java language (Or specified by sponsor)',
              'According to performance candidates will be selected for the next round.',
            ],
          },
          {
            roundNo: 4,
            roundName: 'HR Interview',
            roundDesc: [
              'It will be final round and based on the performance candidates will be selected for the internship or letter of appreciation.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Escape Room',
    image: '/events/escaperoom.png',
    data: [
      {
        intro: [
          'An escape room is a type of physical adventure game where players are imprisoned in a themed room and have a set amount of time to solve a series of puzzles and riddles in order to escape. The rooms are created so that you will be in the right environment to address the challenges presented.An escape room may have logic puzzles, hidden objects, ciphers, and physical challenges, among other types of puzzles. Players must utilize their talents of observation and deduction to find the clues because they are frequently concealed within the room. With teams of four individuals, escape rooms are typically played, and the activity is meant to promote communication and teamwork. The riddles require cooperation from the players.',
          'Fees structure Rs. 30 (per person)',
        ],
        rules: [
          'Participants must respect the property and facilities of the event venue and not cause any damage or disturbance.',
          `Cheating, such as stealing another team's chits or hiding chits, is strictly prohibited and will result in disqualification from the event.`,
          'Each team must follow the designated route and not venture outside of the designated area for the event.',
          'The organizers reserve the right to disqualify any participant or team for violating the rules or causing disruption to the event.',
        ],
        rounds: [
          {
            roundNo: 1,
            roundName: 'Escape Room',
            roundDesc: [
              'From the pool of 30 qualified teams, 5 teams will be formed randomly, with 4 players in each team.',
              'Each team will be given a chit with a clue on it, which will act as a lead to solving the puzzle.',
              'Volunteers will be placed in each room to provide guidance if necessary and ensure that the rules are followed.',
              'The team to find all 5 clues and solve the puzzle will be declared the winner of the Treasure Hunt event.',
            ],
          },
        ],
      },
    ],
  },
];

export default data;
