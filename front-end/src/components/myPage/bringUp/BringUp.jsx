import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MyPokemonImage,
  BigBox,
  ProgressBox,
  ButtonBox,
} from "../../../styles/myPage/bringUp/bringUp.style";
import CustomModal from "./CustomModal";
import EvolutionModal from "./EvolutionModal";

import { pokeFull, pokeIntimate, pokeClean } from "../../../api/pokemonAPI";
import { pokemonDetail, pokeStatus } from "../../../api/pokemonAPI";

const BringUp = () => {
  const { pokeid } = useParams();
  const [full, setFull] = useState(50);
  const [clean, setClean] = useState(50);
  const [intimate, setIntimate] = useState(50);
  const [PokemonData, setPokemonData] = useState(null);
  const [isEating, setIsEating] = useState(false);
  const [isMoving, setIsMoving] = useState(true);
  const [isWalking, setIsWalking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBathing, setIsBathing] = useState(false);
  const [isEvolutionModalOpen, setIsEvolutionModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    isError: false,
    imageSrc: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mypoke = await pokemonDetail(pokeid);
        setPokemonData(mypoke);
        // const status = await pokeStatus(pokeid);
        // setFull(status.full);
        // setClean(status.clean);
        // setIntimate(status.intimate);
      } catch (error) {
        console.error("API 호출 실패:", error.message);
      }
    };

    fetchData();
  }, []);

  //포만감
  const handleEatButtonClick = async () => {
    setIsEating(true);
    setIsModalOpen(true);
    if (full + 5 <= 100) setFull(full + 5);

    await pokeFull(pokeid, full);
    setTimeout(() => {
      setIsEating(true);
      setIsModalOpen(true);
    }, 3000);
    setModalContent({
      title: "밥먹기",
      message: "포만도 +5",
      isError: false,
      imageSrc: "../../../public/image/eating.gif",
    });
  };

  //친밀도
  const handleWalkButtonClick = () => {
    setIsWalking(true);
    setIsModalOpen(true);
    if (intimate + 5 <= 100) setIntimate(intimate + 5);
    pokeIntimate(pokeid, intimate);
    setTimeout(() => {
      setIsWalking(false);
      setIsModalOpen(false);
    }, 3000);
    setModalContent({
      title: "산책하기",
      message: "친밀도 +5",
      isError: false,
      imageSrc: "../../../public/image/walking.gif",
    });
  };

  //청결도
  const handleBathButtonClick = () => {
    setIsModalOpen(true);
    setIsBathing(true);
    if (clean + 5 <= 100) setClean(clean + 5);
    pokeClean(pokeid, clean);
    setTimeout(() => {
      setIsBathing(false);
      setIsModalOpen(false);
    }, 3000);
    setModalContent({
      title: "목욕하기",
      message: "청결도 +5",
      isError: false,
      imageSrc: "../../../public/image/bathing1.gif",
    });
  };

  const handleEvloutionClick = () => {
    setIsEvolutionModalOpen(true);
    setModalContent({
      title: "진화하기",
      message: "앗 포켓몬 상태가?",
      isError: false,
      imageSrc: "../../../public/image/evl.gif",
    });
  };

  const closeEvloutionModal = () => {
    setIsEvolutionModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url('../../../public/image/back1.jpg')`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ProgressBox>
        <div>
          <h2 style={{ textAlign: "center" }}>포만도</h2>
          <progress
            style={{ width: "300px" }}
            className="nes-progress is-primary"
            value={full}
            max="100"
          ></progress>
        </div>
        <div>
          <h2 style={{ textAlign: "center" }}>친밀도</h2>
          <progress
            style={{ width: "300px" }}
            className="nes-progress is-warning"
            value={intimate}
            max="100"
          ></progress>
        </div>
        <div>
          <h2 style={{ textAlign: "center" }}>청결도</h2>
          <progress
            style={{ width: "300px" }}
            className="nes-progress is-error"
            value={clean}
            max="100"
          ></progress>
        </div>
      </ProgressBox>
      <div>
        <BigBox>
          {PokemonData && (
            <MyPokemonImage
              src={PokemonData.imagegif}
              className={`pokemon-image ${isEating ? "eating" : ""} ${
                isMoving ? "moving-image" : ""
              } ${isWalking ? "walking" : ""} ${isBathing ? "bathing" : ""}`}
            />
          )}
        </BigBox>
        <BigBox>
          <ButtonBox>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <button
                  type="button"
                  className="nes-btn is-primary"
                  onClick={handleEatButtonClick}
                  style={{ marginRight: "10px" }}
                >
                  밥먹기
                </button>
                <button
                  type="button"
                  className="nes-btn is-warning"
                  onClick={handleWalkButtonClick}
                  style={{ marginRight: "10px" }}
                >
                  산책하기
                </button>
                <button
                  type="button"
                  className="nes-btn is-error"
                  onClick={handleBathButtonClick}
                >
                  목욕하기
                </button>
              </div>
              {full + intimate + clean >= 300 ? (
                <div style={{ position: "absolute", right: "0px" }}>
                  <button
                    type="button"
                    className="nes-btn is-success"
                    onClick={handleEvloutionClick}
                  >
                    진화
                  </button>
                </div>
              ) : null}
            </div>
          </ButtonBox>
        </BigBox>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalContent.title}
        message={modalContent.message}
        isError={modalContent.isError}
        imageSrc={modalContent.imageSrc}
      />
      <EvolutionModal
        isOpen={isEvolutionModalOpen}
        onClose={closeEvloutionModal}
        title={modalContent.title}
        message={modalContent.message}
        isError={modalContent.isError}
        imageSrc={modalContent.imageSrc}
      />
    </div>
  );
};

export default BringUp;
