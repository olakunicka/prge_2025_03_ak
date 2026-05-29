import {createBrowserRouter} from 'react-router-dom';
import {Home, About, Map, Services, ListOfItems, NewUser} from "./LazyImports";


const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/about',
            element: <About/>
        },
        {
            path: '/map',
            element: <Map/>
        },
        {
            path: '/services',
            element: <Services/>
        },
        {
            path: '/newuser',
            element: <NewUser/>
        },
        {
            path: '/list',
            element: <ListOfItems/>
        }
    ]
)


export default routes;