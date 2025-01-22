import Tabla from "./tabla";
import ProtectedRoute from '../utils/ProtectedRoute';

export default function HomePage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#1f1f1f] text-white flex items-center justify-center p-1">
        <Tabla />
      </main>
    </ProtectedRoute>
  );
}
