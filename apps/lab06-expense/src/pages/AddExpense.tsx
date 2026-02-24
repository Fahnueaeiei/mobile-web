import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton
} from "@ionic/react";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

const AddExpense: React.FC = () => {

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | string>(0);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const saveExpense = async () => {

    if (!title || !amount) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    await addDoc(collection(db, "expenses"), {
      title,
      amount: Number(amount),
      type,
      category,
      note,
      createdAt: new Date()
    });

    history.push("/tabs/list");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>เพิ่มรายการรายรับ–รายจ่าย</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonInput
          label="ชื่อรายการ"
          labelPlacement="floating"
          fill="outline"
          value={title}
          onIonChange={(e) => setTitle(e.detail.value!)}
        />

        <IonInput
          className="ion-margin-top"
          label="จำนวนเงิน"
          labelPlacement="floating"
          fill="outline"
          type="number"
          value={amount}
          onIonChange={(e) => setAmount(e.detail.value!)}
        />

        <IonSelect
          className="ion-margin-top"
          label="ประเภท"
          labelPlacement="floating"
          fill="outline"
          value={type}
          onIonChange={(e) => setType(e.detail.value)}
        >
          <IonSelectOption value="income">รายรับ</IonSelectOption>
          <IonSelectOption value="expense">รายจ่าย</IonSelectOption>
        </IonSelect>

        <IonInput
          className="ion-margin-top"
          label="หมวดหมู่"
          labelPlacement="floating"
          fill="outline"
          value={category}
          onIonChange={(e) => setCategory(e.detail.value!)}
        />

        <IonTextarea
          className="ion-margin-top"
          label="หมายเหตุ"
          labelPlacement="floating"
          fill="outline"
          value={note}
          onIonChange={(e) => setNote(e.detail.value!)}
        />

        <IonButton
          className="ion-margin-top"
          expand="block"
          onClick={saveExpense}
        >
          บันทึกข้อมูล
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default AddExpense;