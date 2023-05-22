import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';
import { useState } from 'react';

const StudentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const onStudentsPick = async (studentIds) => {
    const studentData = await fetchStudentData(studentIds);
    const schoolIds = studentData.map((student) => student.schoolId);
    const legalguardianIds = studentData.map((student) => student.legalguardianId);

    const schoolData = await fetchSchoolData(schoolIds);
    const legalguardianData = await fetchLegalguardianData(legalguardianIds);

    setStudentsData(studentData);
    setSchoolsData(schoolData);
    setLegalguardiansData(legalguardianData);
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        legalguardiansData={legalguardiansData}
      />
    </>
  );
};

export default StudentsDataComponent;
