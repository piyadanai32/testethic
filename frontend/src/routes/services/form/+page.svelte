<script lang="ts">
  import { writable } from 'svelte/store';

  // กำหนดประเภทให้กับ formData
  interface PetitionForm {
    correspondenceNo: string;
    title_th: string;
    title_en: string;
    objectiveId: string;
    objectiveOther: string;
    grantId: string;
    grantOther: string;
    typeId: string;
    statusId: string;
    researcherId: string;
    currentLevelId: string;
    staffId: string;
    note: string;
  }

  let formData: PetitionForm = {
    correspondenceNo: '',
    title_th: '',
    title_en: '',
    objectiveId: '',
    objectiveOther: '',
    grantId: '',
    grantOther: '',
    typeId: '',
    statusId: '',
    researcherId: '',
    currentLevelId: '',
    staffId: '',
    note: ''
  };

  const submissionStatus = writable('');

  const addPetition = async (event: Event) => {
    event.preventDefault(); // ใช้ preventDefault ในฟังก์ชันเอง

    try {
      const res = await fetch('http://localhost:8000/petitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        submissionStatus.set('Petition added successfully!');
        formData = { // รีเซ็ตข้อมูลในฟอร์มหลังจากส่ง
          correspondenceNo: '',
          title_th: '',
          title_en: '',
          objectiveId: '',
          objectiveOther: '',
          grantId: '',
          grantOther: '',
          typeId: '',
          statusId: '',
          researcherId: '',
          currentLevelId: '',
          staffId: '',
          note: ''
        };
      } else {
        const error = await res.json();
        submissionStatus.set(error.message || 'Failed to add petition.');
      }
    } catch (err) {
      console.error('Error adding petition:', err);
      submissionStatus.set('Failed to add petition.');
    }
  };
</script>

<div class="form-container">
  <h2>Add New Petition</h2>
  
  <form on:submit={addPetition}>
    <input type="text" bind:value={formData.correspondenceNo} placeholder="ที่" required />
    <input type="text" bind:value={formData.title_th} placeholder="ชื่อภาษาไทย" required />
    <input type="text" bind:value={formData.title_en} placeholder="ชื่ออังกฤษ" required />

    <input type="text" bind:value={formData.objectiveId} placeholder="Objective ID" required />
    <input type="text" bind:value={formData.objectiveOther} placeholder="Objective Other" />
    <input type="text" bind:value={formData.grantId} placeholder="Grant ID" required />
    <input type="text" bind:value={formData.grantOther} placeholder="Grant Other" />
    <input type="text" bind:value={formData.typeId} placeholder="Type ID" required />
    <input type="text" bind:value={formData.statusId} placeholder="Status ID" required />
    <input type="text" bind:value={formData.researcherId} placeholder="Researcher ID" required />
    <input type="text" bind:value={formData.currentLevelId} placeholder="Current Level ID" required />
    <input type="text" bind:value={formData.staffId} placeholder="Staff ID" required />
    <textarea bind:value={formData.note} placeholder="Note" rows="4"></textarea>

    <button type="submit">Add Petition</button>
  </form>

  <div class="status-message">
    {#if $submissionStatus}
      <p>{$submissionStatus}</p>
    {/if}
  </div>
</div>

<style>
  .form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .form-container h2 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  form {
    display: grid;
    gap: 16px;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    box-sizing: border-box;
  }

  input:focus,
  textarea:focus {
    border-color: #007bff;
    outline: none;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 12px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
  }

  button:hover {
    background-color: #0056b3;
  }

  .status-message {
    margin-top: 20px;
    text-align: center;
  }

  .status-message p {
    font-size: 18px;
    font-weight: bold;
  }

  .status-message p {
    color: green;
  }
</style>
