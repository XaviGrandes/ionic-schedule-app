import React, { useContext, useState } from "react";
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonModal, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import ActivitiesContext, { Activity } from "../../data/activities-context";
import classes from './AllActivities.module.css';
import CompleteModal from "../../components/CompleteModal";
import { checkmarkOutline } from "ionicons/icons";

const AllActivities: React.FC = () =>{

const [activityToComplete, setActivityToComplete] = useState<Activity>();

    // en este momento ya tenemos acceso a las ActivitiesContext que creamos anteriormente
const activitiesCtxt = useContext(ActivitiesContext)

const openCompleteModal = (activity: Activity) =>{
    setActivityToComplete(activity);
}

const closeModal = () => {
    setActivityToComplete(undefined);
}

    return (
        <React.Fragment>
        
        <IonModal isOpen={!!activityToComplete} canDismiss={true}>
            <CompleteModal activity={activityToComplete as Activity} dissmissModal={closeModal}/>
        </IonModal>
        
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        {/* este menu está automáticamente conectado con el IonMenu de la App */}
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>All activities</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    { activitiesCtxt.activities.map(activity => {
                    return <IonRow key={activity.id}>
                        <IonCol className="ion-text-center">
                            <IonCard>
                                <img src={activity.imageUrl} alt="Activity" />
                                <IonCardHeader>
                                    <IonCardTitle>{activity.hour}</IonCardTitle>
                                    <IonCardSubtitle>{activity.title}</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <p>{activity.description}</p>
                                    <IonItem lines="none">
                                        { !activity.isCompleted ?
                                        <IonButton className={classes.FullWidth} fill="clear" onClick={() => openCompleteModal(activity)}>Complete Activity
                                        </IonButton>:
                                        <IonIcon color="success" className={classes.FullWidth} icon={checkmarkOutline}/>
                                        }
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    })
                    }
                </IonGrid>
            </IonContent>
        </IonPage>
        </React.Fragment>
    );
}

export default AllActivities;