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
  IonButton,
  IonAlert
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const EditExpense: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "expenses", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setAmount(data.amount);
        setType(data.type);
        setCategory(data.category);
        setNote(data.note);
      }
    };

    fetchData();
  }, [id]);

  const updateExpense = async () => {

    const docRef = doc(db, "expenses", id);

    await updateDoc(docRef, {
      title,
      amount: Number(amount),
      type,
      category,
      note
    });

    history.push("/expenses");
  };

  const deleteExpense = async () => {

    const docRef = doc(db, "expenses", id);
    await deleteDoc(docRef);

    history.replace("/expenses");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>แก้ไขรายการ</IonTitle>
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
          type="number"
          labelPlacement="floating"
          fill="outline"
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

        {/* ปุ่มอัปเดต */}
        <IonButton
          className="ion-margin-top"
          expand="block"
          onClick={updateExpense}
        >
          อัปเดตข้อมูล
        </IonButton>

        {/* ปุ่มลบ */}
        <IonButton
          className="ion-margin-top"
          expand="block"
          color="danger"
          onClick={() => setShowAlert(true)}
        >
          ลบข้อมูล
        </IonButton>

        {/* กล่องยืนยัน */}
        <IonAlert
          isOpen={showAlert}
          header="ยืนยันการลบ"
          message="คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?"
          buttons={[
            {
              text: "ยกเลิก",
              role: "cancel",
              handler: () => setShowAlert(false)
            },
            {
              text: "ลบ",
              role: "destructive",
              handler: () => deleteExpense()
            }
          ]}
          onDidDismiss={() => setShowAlert(false)}
        />

      </IonContent>
    </IonPage>
  );
};

export default EditExpense;