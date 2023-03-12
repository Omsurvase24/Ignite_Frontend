import React, { useState } from 'react';
import treasurerStyles from '../../styles/pages/Treasurer.module.css';
import styles from '../../styles/pages/Admin.module.css';
import TestScores from '../../components/admin/TestScores';
import TestEntries from '../../components/admin/TestEntries';
import CalculateScore from '../../components/admin/CalculateScore';
import AddCategory from '../../components/admin/AddCategory';
import SeeCategories from '../../components/admin/SeeCategories';
import ListQuestions from '../../components/admin/ListQuestions';

const Dashboard = () => {
  const [tab, setTab] = useState('add new category');
  return (
    <div className={`${treasurerStyles.treasurer} ${styles.admin}`}>
      <h1>Admin Dashboard</h1>

      <div className={styles.tab}>
        <button
          onClick={() => setTab('add new category')}
          style={{ background: tab === 'add new category' && '#0cd1eb' }}
        >
          Add New Quiz Category
        </button>
        <button
          onClick={() => setTab('all categories')}
          style={{ background: tab === 'all categories' && '#0cd1eb' }}
        >
          See all categories
        </button>
        <button
          onClick={() => setTab('add questions')}
          style={{ background: tab === 'add questions' && '#0cd1eb' }}
        >
          Add questions
        </button>
        <button
          onClick={() => setTab('see questions')}
          style={{ background: tab === 'see questions' && '#0cd1eb' }}
        >
          See questions
        </button>
        <button
          onClick={() => setTab('test entries')}
          style={{ background: tab === 'test entries' && '#0cd1eb' }}
        >
          Test entries
        </button>
        <button
          onClick={() => setTab('see scores')}
          style={{ background: tab === 'see scores' && '#0cd1eb' }}
        >
          See scores
        </button>
        <button
          onClick={() => setTab('calculate scores')}
          style={{ background: tab === 'calculate scores' && '#0cd1eb' }}
        >
          Calculate scores
        </button>
      </div>

      {/* <TestEntries /> */}
      {/* <CalculateScore /> */}
      {/* <AddCategory /> */}
      {/* <SeeCategories /> */}
      <ListQuestions />
      {/* <TestScores /> */}
    </div>
  );
};

export default Dashboard;
