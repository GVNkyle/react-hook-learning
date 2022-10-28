import { useRef } from 'react';
import { useReducer } from 'react';
import './App.css';

/* ----------------------------------------- useReducer ----------------------------------------- */
// 1. Init State
const initState = {
  job: '',
  jobs: []
}

// 2. Actions
const SET_JOB = 'set_job';
const ADD_JOB = 'add_job';
const DELETE_JOB = 'delete_job';

const setJob = payload => {
  return {
    type: SET_JOB,
    payload
  }
};
const addJob = payload => {
  return {
    type: ADD_JOB,
    payload
  }
};
const deleteJob = payload => {
  return {
    type: DELETE_JOB,
    payload
  }
};

// 3.Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_JOB:
      return { ...state, job: action.payload };
    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload]
      }
    case DELETE_JOB:
      const newJobs = [...state.jobs]
      newJobs.splice(action.payload, 1);
      return { ...state, jobs: newJobs}
    default:
      throw new Error(`Invalid action ${action.type}`);
  }
}
// 4. Dispatch Action

function UseReducerApp() {

  const [state, dispatch] = useReducer(reducer, initState);
  const inputRef = useRef();
  const { job, jobs } = state;

  const handleSubmit = () => {
    dispatch(addJob(job));
    dispatch(setJob(''));
    inputRef.current.focus();
  }

  return (
    <div style={{ padding: '0 20px' }}>
      <h3>Todo with reducer</h3>
      <input
       ref={inputRef}
        value={job}
        placeholder='Enter todo...'
        onChange={e => dispatch(setJob(e.target.value))}
      />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {
          jobs.map((job, index) => (
            <li key={index}> {job} 
              <span onClick={() => dispatch(deleteJob(index))}>
                &times;
              </span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default UseReducerApp;
