// export default function ProtectedRoute({ component: Component }: { component: React.ComponentType }): React.ReactElement {
//   const id = useAuthStore((state) => state).id;

//   if (!id) {
//     return <Navigate to="/" />;
//   }

//   return <Component />;
// }
