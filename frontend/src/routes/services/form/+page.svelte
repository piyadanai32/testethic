<script lang="ts">
  import { writable } from 'svelte/store';

  // กำหนดประเภทให้กับ formData
  interface PetitionForm {
    correspondenceNo: string;
    title_th: string;
    title_en: string;
    objectiveId: string;
    grantId: string;
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
    grantId: '',
    typeId: '',
    statusId: '',
    researcherId: '',
    currentLevelId: '',
    staffId: '',
    note: ''
  };

  const submissionStatus = writable('');

  // แก้ไข event parameter เพื่อให้ TypeScript เข้าใจประเภทของ event
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
          grantId: '',
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

<style>
  .form-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  input, textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: #666; /* สีพื้นหลังเทา */
    color: white; /* ตัวอักษรสีขาว */
  }

  input::placeholder, textarea::placeholder {
    color: #ddd; /* เปลี่ยนสีตัวอักษร placeholder เป็นสีเทา */
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }

  button:hover {
    background-color: #0056b3;
  }

  .status-message {
    margin-top: 20px;
    text-align: center;
    font-size: 18px;
  }
</style>


<div class="form-container">
  <h2>Add New Petition</h2>
  
  <form on:submit={addPetition}>
    <input type="text" bind:value={formData.correspondenceNo} placeholder="Correspondence No" required />
    <input type="text" bind:value={formData.title_th} placeholder="Title (TH)" required />
    <input type="text" bind:value={formData.title_en} placeholder="Title (EN)" required />
    <input type="text" bind:value={formData.objectiveId} placeholder="Objective ID" required />
    <input type="text" bind:value={formData.grantId} placeholder="Grant ID" required />
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
