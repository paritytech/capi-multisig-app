import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { render } from 'preact'
import { Dashboard } from './pages/dashboard'
import { CreateMultisig } from './pages/create-multisig'
import { PageError } from './pages/error'
import './index.css'

const errorElement = <PageError />

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement,
  },
  {
    path: '/create-multisig',
    element: <CreateMultisig />,
    errorElement,
  },
])

const Main = () => <RouterProvider router={router} />
render(<Main />, document.getElementById('app') as HTMLElement)
