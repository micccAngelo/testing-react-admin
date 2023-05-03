import jsonServerProvider from "ra-data-json-server";
import { Admin, Resource } from 'react-admin';
import { authProvider } from './Auth/AuthProvider';
import { UserList } from './User/users';
import { PostCreate, PostEdit, PostList } from "./Post/posts";
import './App.css';
import Login from "./Pages/Login";

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
  return (
    <div>
      <Admin authProvider={authProvider} dataProvider={dataProvider} loginPage={Login}>
        <Resource name="users" list={UserList} recordRepresentation="name"/>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}/>
      </Admin>
    </div>
  );
}

export default App;