import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MyButton = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    if (mounted) {
      router.push('/completo');
    }
  };

  if (!mounted) {
    // Mientras se monta el componente, retornamos un placeholder vacío.
    return null;
  }

  return (
    <button className={style.botonIngresar} onClick={handleClick}>
      Ingresar
    </button>
  );
};

export default MyButton;
