import React from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { ButtonMaxSize, MainStack, TitlePage } from "./DetailStyles";

export default function Detail() {
  const { infoID } = useParams();
  let navigate: NavigateFunction = useNavigate();

  return (
    <MainStack>
      <TitlePage>Detail {infoID}</TitlePage>
      <ButtonMaxSize onClick={() => navigate(-1)}>Voltar</ButtonMaxSize>
    </MainStack>
  );
}
