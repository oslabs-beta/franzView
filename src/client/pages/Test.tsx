import React from "react";
import {
  IonContent,
  IonPage,
  IonTitle,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import Chart from "../components/ChartEx";

const Test: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonTitle>TEST TEST TEST</IonTitle>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent>
                  <Chart />
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                <IonCardContent>
                  <Chart />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Test;
