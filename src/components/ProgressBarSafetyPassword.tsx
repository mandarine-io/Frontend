import React from "react";
import { IonProgressBar, IonText } from "@ionic/react";
import { FieldError } from "react-hook-form";

interface ProgressBarSafetyPasswordProps {
    val: number
    error: FieldError | undefined
}
export const ProgressBarSafetyPassword = (props: ProgressBarSafetyPasswordProps) => {

    const arrayColorStrengthPassword = ['danger', 'warning', 'primary', 'dark', 'success']
    const getProgressBarColor = (score: number) => {
        return arrayColorStrengthPassword[score]
    }

    const arrayStrengthPassword = ['Очень слабый', 'Слабый', 'Средний', 'Хороший', 'Сильный']
    const getStrengthPassword = (score: number) => {
        return arrayStrengthPassword[score]
    }

    const getProgressBarValue = (score: number) => {
        return score ? (score + 1) / 5 : 0
    }

    return (
        !props.error && props.val !== -1 && (
            <div className="ion-margin-top">
                <IonProgressBar
                    value={getProgressBarValue(props.val)}
                    color={getProgressBarColor(props.val)}
                />
                <IonText color={getProgressBarColor(props.val)}>
                    Сложность пароля: {getStrengthPassword(props.val)}
                </IonText>
            </div>
        )
    )
}
