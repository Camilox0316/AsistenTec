import React, { useState, useEffect } from 'react';
import { MyAssistanceCard } from '../components/MyAssistanceCard';
import { useAuth } from '../hooks/useAuth'; // Assuming the useAuth hook is in a separate file
import axios from 'axios';

export const MyAssistancesPage = () => {
  const [assistances, setAssistances] = useState([]);
  const { auth } = useAuth();
  const hostUrl = import.meta.env.VITE_HOST_URL;

  console.log(auth.id);
  useEffect(() => {
    const fetchAssistances = async () => {
      try {
        // First, fetch applications by user ID
        const response = await axios.get(`${hostUrl}/received/getApplicationByUser/${auth.id}`);
        const applications = response.data;
        console.log('Applications:', applications);
  
        // Then, for each application, fetch the corresponding assistance details
        const assistancesDetailsPromises = applications.map(async (application) => {
          try {
            const detailsResponse = await axios.get(`${hostUrl}/assistance/getAssistanceByIdObject/${application.idAssistance}`);
            const assistanceDetails = detailsResponse.data;
            console.log('Assistance Details:', assistanceDetails);
            return {
              ...application,
              assistanceDetails,
            };
          } catch (detailsError) {
            console.error('Error fetching assistance details:', detailsError);
            return null; // Return null if there's an error fetching the details, or handle differently as needed
          }
        });
  
        const resolvedAssistancesDetails = await Promise.all(assistancesDetailsPromises);
        const filteredAssistances = resolvedAssistancesDetails.filter(detail => detail !== null); // Filter out any null results due to errors
        setAssistances(filteredAssistances);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
  
    if (auth.id) {
      fetchAssistances();
    }
  }, [auth.id, hostUrl]);
  
  console.log(assistances);
  
  console.log(assistances);
  return (
    <div className="my-assistances">
      <h2 className="section-title">Mis Asistencias</h2>
      {assistances.map((assistance, index) => (
        console.log(`inside map: ${assistance}`),
        <MyAssistanceCard
          key={index}
          courseName={assistance.assistanceDetails[0].name}
          semester={`Semestre ${assistance.assistanceDetails[0].semester}`}
          type={assistance.assistanceDetails[0].assistanceType}
          courseCode={assistance.assistanceDetails[0].courseCode}
        />
      ))}
    </div>
  );
};