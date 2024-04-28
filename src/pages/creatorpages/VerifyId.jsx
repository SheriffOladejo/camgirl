import { useState, useEffect, useRef } from "react";
import Logo from "../../components/Logo";
import DragAndDrop from "../../components/DragAndDrop";

function VerifyId() {
  const [formInput, setFormInput] = useState({
    country: "",
    picture: null
  });

  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({
    country: "",
    picture: ""
  });
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const countryNames = data.map(country => country.name.common);
      setCountries(countryNames);
    };
    fetchCountries();
  }, []);
  // drag and drop
  const [imageDataUrl, setImageDataUrl] = useState("");
  const handleFileDrop = (files) => {
    // Handle dropped files
    const file = files[0];  // Assuming only one file is dropped
    file && updateImageInState(file);
  };



  useEffect(() => {
    const storedImageDataUrl = localStorage.getItem("ID");
    if (storedImageDataUrl) {
      setImageDataUrl(storedImageDataUrl);
    }
  }, []);

  const handleInputChange = (event) => {
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value
    });
  };
  // choose file
  const fileInputRef = useRef();

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const updateImageInState = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setImageDataUrl(dataUrl);
      setFormInput(prev => ({
        ...prev,
        picture: dataUrl
      }));
      localStorage.setItem("ID", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    updateImageInState(file);
  };
  const validateForm = () => {
    const errorsCopy = { ...errors };
    let isValid = true;

    if (!formInput.country) {
      errorsCopy.country = "Please select your country of residence.";
      isValid = false;
    } else {
      errorsCopy.country = "";
    }

    if (!formInput.picture) {
      errorsCopy.picture = "Please provide a verification document.";
      isValid = false;
    } else {
      errorsCopy.picture = "";
    }

    setErrors(errorsCopy);
    return isValid;
  };
  const submitProfile = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      localStorage.setItem('verifyId', JSON.stringify(formInput));
      window.location.href = '/almost-done';
      alert('We\'ll get back to you!');
    } else {
      alert('Please fill in all the required fields.');
    }
  };


  return (
    <section className="py-8 px-6 md:py-10 md:px-10 bg-offwhite">
      <Logo />

      <div className="max-w-lg mx-auto p-6 md:p-20 md:shadow-xl">
        <progress value="65" max="100" className="progress-bar w-full h-4"></progress>
        <h1 className="font-semibold text-[1.6rem]">Verify your identity</h1>
        <form action="/almost-done" onSubmit={submitProfile} className="space-y-5 pr-4 pt-4">
          <div className="flex flex-col">
            <label htmlFor="country" className="font-medium text-[0.8rem]">Country of residence</label>
            <select
              name="country"
              value={formInput.country}
              onChange={handleInputChange}
              className="outline-none border-1 border-color-grey bg-color-lightGrey p-2 mt-2 text-color-grey text-[0.8rem]"
            >
              <option value='' >Nigeria</option>
              {countries.sort().map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="picture" className="font-medium text-[0.8rem]">Provide verification document</label>
            {/* hide when a file is in */}
            <DragAndDrop
              onFileDrop={handleFileDrop} onChange={handlePictureChange} className={`mt-2 flex flex-col space-y-2 bg-color-2 items-center justify-center border-dashed border-2 border-color-3 w-full h-40 ${imageDataUrl ? 'hidden' : 'flex'}`} >
              <img src="../src/assets/icons/fileupload.png" alt="upload" className="w-8 h-8" />
              <h6 className="font-semibold ">Drag & drop files or <span>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handlePictureChange}
                />
                <a onClick={openFileDialog} href="#" className="text-color-pink text-[0.9rem]">Browse</a></span> </h6>
              <p className="text-[0.8rem]">Supported formats JPEG,PNG,PDF,WORD</p>

            </DragAndDrop>
            {imageDataUrl && <img src={imageDataUrl} alt="Uploaded document" className="w-full h-40" />}
          </div>
          <div className="flex justify-between">
            <div className="flex cursor-pointer space-x-2 items-center" onClick={() => window.history.back()}>
              <img src="../src/assets/icons/back.png" alt="Go back" className="w-4 h-4" />
              <p className="font-medium text-[0.8rem]">Back</p>
            </div>
            <button type="submit" className="bg-color-pink text-color-white rounded-lg text-[0.8rem] px-4 py-2 font-medium">
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default VerifyId;
