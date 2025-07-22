export default function PrivetRoute() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
}
