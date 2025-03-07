import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const MySkeleton = () => (
    <>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton width={80}/> 
        </SkeletonTheme>
    </>
);
export default MySkeleton;