import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText
} from "@ionic/react";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

interface Expense {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  note: string;
}

const ExpenseList: React.FC = () => {

  const history = useHistory();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {

    const q = query(
      collection(db, "expenses"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const data: Expense[] = [];
      let income = 0;
      let expense = 0;

      snapshot.forEach((doc) => {
        const item = { id: doc.id, ...doc.data() } as Expense;
        data.push(item);

        if (item.type === "income") {
          income += item.amount;
        } else {
          expense += item.amount;
        }
      });

      setExpenses(data);
      setTotalIncome(income);
      setTotalExpense(expense);

    });

    return () => unsubscribe();

  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>รายการรายรับ–รายจ่าย</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonText color="success">
          <h2>รายรับรวม: {totalIncome} บาท</h2>
        </IonText>

        <IonText color="danger">
          <h2>รายจ่ายรวม: {totalExpense} บาท</h2>
        </IonText>

        <IonList>
          {expenses.map((item) => (
            <IonItem
              key={item.id}
              button
              onClick={() => history.push(`/edit-expense/${item.id}`)}
            >
              <IonLabel>
                <h2>{item.title}</h2>
                <p>{item.category} | {item.note}</p>
                <p>
                  {item.type === "income" ? "รายรับ" : "รายจ่าย"} : {item.amount} บาท
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default ExpenseList;