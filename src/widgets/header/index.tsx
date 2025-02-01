import { Route as IndexRoute } from '@/routes';
import { Link } from '@tanstack/react-router';

export const Header = () => {
  return (
    <div style={{ marginBottom: '30px', padding: '10px' }}>
      <Link to={IndexRoute.to} style={{ fontSize: '30px', fontWeight: 'bold' }}>
        YUNA SHOP
      </Link>
    </div>
  );
};
