import CheckArchive from './components/CheckArchive';
import CheckLatest from './components/CheckLatest';

const Newsletters = () => {
    return (
        <div className="h-screen w-full overflow-scroll bg-blue-100 flex flex-col items-center justify-center">
            <CheckLatest />
            <CheckArchive />
        </div>
    );
};
export default Newsletters;
