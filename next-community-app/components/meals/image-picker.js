'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name, serverValidation }) {
  const [pickedImage, setPickedImage] = useState();
  const [localValidation, setLocalValidation] = useState(null);
  const imageInput = useRef();

  useEffect(() => {
    if (serverValidation) {
      setPickedImage(null);
      setLocalValidation(serverValidation);
      if (imageInput.current) {
        imageInput.current.value = '';
      } else {
        setLocalValidation(null);
      }
    }
  }, [serverValidation]);

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) {
      setPickedImage(null);
      setLocalValidation('이미지를 업로드해주세요.');
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setPickedImage(null);
      setLocalValidation('이미지는 1MB 이하만 업로드할 수 있습니다.');
      e.target.value = ''; // 선택 초기화
      return;
    }

    setLocalValidation(null);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={`${classes.preview} ${localValidation ? classes['has-validation'] : ''}`}>
          {!pickedImage ? (
            <p>이미지를 업로드해주세요.</p>
          ) : (
            <Image src={pickedImage} alt="The image selected by the user." fill />
          )}
        </div>

        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button className={classes.button} type="button" onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>

      {localValidation && <span className="validation">{localValidation}</span>}
    </div>
  );
}
