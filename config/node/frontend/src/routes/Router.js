import {createBrowserRouter} from 'react-router-dom';
import {Home, About, Map, Services, ListOfItems, NewUser} from "./LazyImports";
import NewPolygon from "../pages/NewPolygon";
import PolygonList from "../pages/PolygonList";

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
        },
        {
            path: '/newpolygon',
            element: <NewPolygon/>
        },
        {
            path: '/polygonlist',
            element: <PolygonList/>
        }
    ]
)


export default routes;