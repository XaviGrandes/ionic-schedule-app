import React, { PropsWithChildren, useState } from 'react';
import ActivitiesContext, { Activity, ActivitiesContextModel, ActivityType } from './activities-context';

const ActivitiesContextProvider: React.FC<PropsWithChildren> = (props) => {

    const [activities, setActivities] = useState<Activity[]>(
        [
            {
                id: Math.random().toString(),
                title: 'Coding a schedule App',
                description: 'Created a React App with Ionic',
                hour:'10:00',
                activityType:'work',
                imageUrl: './assets/images/coding.jpg',
                isCompleted: false
            },
            {
                id: Math.random().toString(),
                title: 'Cooking dinner',
                description: 'Cook rice with eggs',
                hour:'13:00',
                activityType:'work',
                imageUrl: './assets/images/cooking.jpg',
                isCompleted: false
            },
            {
                id: Math.random().toString(),
                title: 'Running',
                description: 'Run with frinds',
                hour:'19:00',
                activityType:'hobby',
                imageUrl: './assets/images/running.jpg',
                isCompleted: false
            },
        ]
    );

    const addActivity = (title: string, description: string, hour: string, activityType: ActivityType) => {
        let imageUrl = '';
        switch(activityType){
            case 'rest':
                imageUrl = './assets/images/cooking.jpg'
                break;
            case 'work':
                imageUrl = './assets/images/coding.jpg'
                break;
            case 'hobby':
                imageUrl = './assets/images/running.jpg'
                break;
            default:
                imageUrl = './assets/images/running.jpg'
                break;
        };
        const newActivity: Activity = {
            id: Math.random().toString(),
            title,
            description,
            hour,
            activityType,
            imageUrl,
            isCompleted: false,
        };

        setActivities(currActivities => {
            return [...currActivities, newActivity]
        })
    };

    const completeActivity = (activityId: string) => {
        setActivities(currActivities => {
            const updateActivities = [...currActivities];
            const selectedActivityIndex = activities.findIndex(act => act.id === activityId);
            const updateActivity = {...updateActivities[selectedActivityIndex], isCompleted: true};
            updateActivities[selectedActivityIndex] = updateActivity;
            return updateActivities;
        })
    };

    const activitiesContext: ActivitiesContextModel = {
        activities,
        addActivity,
        completeActivity
    };

    return (
        <ActivitiesContext.Provider value={activitiesContext}>
            {props.children}
        </ActivitiesContext.Provider>
    );
}

export default ActivitiesContextProvider;