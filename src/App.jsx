import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage, { fetchJob } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';


const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return;
  }

  // Delete a Job
  const deleteJob = async (jobId) => {
    const res = await fetch(`/api/jobs/${jobId}`, {
      method: 'DELETE',
    });
    return;
  }

  // Update a Job
  const updateJob = async (updatedJob) => {
    const res = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedJob)
    });
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={fetchJob} />
        <Route path='/edit-job/:id' element={<EditJobPage updateJob={updateJob} />} loader={fetchJob} />
        <Route path='/add-job' element={<AddJobPage addJob={addJob} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );


  return <RouterProvider router={router} />

  // return (
  //   <>
  //     {/* Navbar */}
  //     <Navbar />

  //     {/* <!-- Hero --> */}
  //     <Hero />  

  //     {/* <!-- Developers and Employers --> */}
  //     <HomeCards />

  //     {/* <!-- Browse Jobs --> */}
  //     <JobListings />

  //     {/* View All Jobs */}
  //     <ViewAllJobs />
  //   </>
  // )
}

export default App