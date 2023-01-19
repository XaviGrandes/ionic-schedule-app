import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonSegment, IonLabel, IonSegmentButton, IonItem, IonInput, IonDatetime, IonButton, IonToast } from "@ionic/react";
import React, { useRef, useContext, useState } from "react"
import ActivitiesContext, { ActivityType } from "../../data/activities-context";
import { useHistory } from 'react-router-dom'

const AddActivity: React.FC = ()=>{

    const history = useHistory();

    // creamos unas constantes para guardar el valor del target
    const titleInput = useRef<HTMLIonInputElement>(null);
    const descriptionInput = useRef<HTMLIonInputElement>(null);
    const activityTypeInput = useRef<HTMLIonSegmentElement>(null);
    const hourInput = useRef<HTMLIonDatetimeElement>(null);

    const activitiesCtxt = useContext(ActivitiesContext);

    const [toastMsg, setToastMsg] = useState<string>('')

    const addActivity = () =>{
        const title = titleInput.current?.value as string;
        const description = descriptionInput.current?.value as string;
        const activityType = activityTypeInput.current?.value as ActivityType;
        const startDate = new Date(hourInput.current?.value as string);
        const startHour = startDate.getHours() + ':' + startDate.getMinutes()

        if (title && description && activityType && startHour){
           activitiesCtxt.addActivity(title, description, startHour, activityType);
           setToastMsg('The activity has been saved');
           history.push('/all-activities') 
        }
    }

    return(
        <React.Fragment>
        <IonToast isOpen={!!toastMsg} message={toastMsg} duration={4000} color="success" onDidDismiss={() => setToastMsg('')}/>
        
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Add Activity</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className="ion-text-center">
                            <IonSegment ref={activityTypeInput}>
                                <IonSegmentButton value="work">
                                    <IonLabel>Work</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="rest">
                                    <IonLabel>Rest</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="hobby">
                                    <IonLabel>Hobby</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Activity title</IonLabel>
                                <IonInput ref={titleInput} type="text"></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                                <IonLabel position="floating">Activity description</IonLabel>
                                <IonInput ref={descriptionInput} type="text"></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel className="ion-padding-bottom" position="floating">Starting hour</IonLabel>
                                <IonDatetime ref={hourInput} className="ion-margin-top" display-format="h:mm A" picker-format="h:mm A" value={new Date().toISOString()}></IonDatetime>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-text-center ion-margin-top">
                            <IonButton onClick={addActivity} expand="block" fill="outline">Add activity</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
        </React.Fragment>
    );
}

export default AddActivity