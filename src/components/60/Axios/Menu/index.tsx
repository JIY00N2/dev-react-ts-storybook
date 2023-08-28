import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/posts'>posts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
