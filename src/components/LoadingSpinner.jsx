import { ColorRing } from 'react-loader-spinner';

function LoadingSpinner() {
  return (
    <div className="flex flex-row w-full h-auto items-center justify-center mt-[30px]">
    <ColorRing
        height="50"
        width="50"
        radius="5"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#f94f64', '#f94f64', '#f94f64', '#f94f64', '#f94f64']}
    />
</div>
  )
}

export default LoadingSpinner