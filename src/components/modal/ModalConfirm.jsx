import React from "react";
import ButtonIcon from "../button/ButtonIcon";
import Lottie from "react-lottie-player";
import { questionAnimation } from "../../assets";
import { handleDisplayModalConfirm } from "../../utils/global_function";

const ModalConfirm = ({
  name,
  header,
  description,
  confirmBtnText,
  confirmBtnIcon,
  confirmBtnBackground,
  confirmBtnTextColor,
  onConfirm
}) => {
  return (
    <div
      className="fixed w-full h-screen bg-slate-900 bg-opacity-50 z-50 flex justify-center items-center backdrop-blur-md"
      style={{ display: "none" }}
      id={`modal-confirm-${name}`}
    >
      <div className="p-5 bg-slate-900 duration-300 rounded text-center max-w-[500px] m-3">
        <div className="w-full">
          <h3 className="text-white">{header}</h3>
          <span className="text-white">{description}</span>
        </div>
        <div className="w-full flex justify-center pt-10 pb-10">
          <Lottie
            loop
            animationData={questionAnimation}
            play
            style={{ width: 150, height: 150 }}
            speed={0.3}
          />
        </div>
        <div className="flex gap-2 w-full justify-center">
          <ButtonIcon
            text={confirmBtnText}
            bgColor={confirmBtnBackground}
            textColor={confirmBtnTextColor}
            iconPosition="l"
            classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
            type="button"
            icon={confirmBtnIcon}
            onClick={onConfirm ? onConfirm : null}
          />
          <ButtonIcon
            text="Close"
            bgColor="bg-red-600 hover:bg-red-500"
            textColor="white"
            iconPosition="l"
            classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
            type="button"
            icon={"ri-close-line"}
            onClick={() => handleDisplayModalConfirm(name, 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
