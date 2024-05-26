import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { collection, getDocs} from 'firebase/firestore';
import { auth, googleProvider, db } from "../config/firebase";

const RewardPointsDisplay = () => {
  const [rewardPoints, setRewardPoints] = useState(0);

  useEffect(() => {
    console.log("hi")
    const fetchRewardPoints = async () => {
      try {
        const user = auth.currentUser;
      const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
      const querySnapshot = await getDocs(userEntriesCollection);
      const data = querySnapshot.docs.map(doc => doc.data().rewardPoints);
      console.log(data)
    //   setMonthlyData(data[0] || {});
        // if (userEntriesCollection.exists) {
        //   const userData = userDoc.data();
        //   const { rewardPoints } = userData.data || { rewardPoints: 0 }; // Access rewardPoints from the data object, default to 0 if not available
          setRewardPoints(data);
        // }
      } catch (error) {
        console.error('Error fetching reward points:', error);
      }
    };

    fetchRewardPoints();
  }, []);

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>My Rewards</Card.Title>
        <Card.Text>
          You've earned <strong>{rewardPoints}</strong> reward points this month!
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RewardPointsDisplay;
