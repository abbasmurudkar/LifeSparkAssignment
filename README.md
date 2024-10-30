<h1>Patient Management System</h1>

<h2>Overview</h2>
<p>This project is a Patient Management System built using Spring Boot for the backend and React for the frontend. The backend uses MongoDB for data storage and provides RESTful APIs for CRUD operations and searching patient data. The frontend allows users to interact with the system, view, add, edit, and delete patient records.</p>

<h2>Setup Instructions</h2>

<h3>Prerequisites</h3>
<ul>
    <li>Java 8 or higher</li>
    <li>Maven</li>
    <li>MongoDB</li>
    <li>Node.js and npm (for the React frontend)</li>
</ul>

<h3>Backend Setup (Spring Boot)</h3>
<ol>
    <li><strong>Clone the repository:</strong>
    <pre><code>git clone https://github.com/abbasmurudkar/LifeSparkAssignment
cd server</code></pre>
    </li>
    <li><strong>Configure MongoDB:</strong>
    <p>Ensure MongoDB is running on your local machine. By default, the application connects to MongoDB at but make sure if you are using same mongodb url then extract it from the repository the below is just for reference that how you can configure it <code>mongodb://localhost:27017/patientdb</code>. You can configure this in the <code>application.properties</code> file if necessary:</p>
    <pre><code>spring.data.mongodb.uri=mongodb://localhost:27017/patientdb</code></pre>
    </li>
    <li><strong>Build and run the Spring Boot application:</strong>
    <pre><code>mvn clean install
mvn spring-boot:run</code></pre>
    <p>The backend server will start on <code>http://localhost:8080</code>.</p>
    </li>
</ol>

<h3>Frontend Setup (React)</h3>
<ol>
    <li><strong>Navigate to the frontend directory:</strong>
    <pre><code>cd ../frontend</code></pre>
    </li>
    <li><strong>Install the dependencies:</strong>
    <pre><code>npm install</code></pre>
    </li>
    <li><strong>Start the React application:</strong>
    <pre><code>npm start</code></pre>
    <p>The frontend server will start on <code>http://localhost:3000</code>.</p>
    </li>
</ol>

<h2>API Design</h2>

<h3>Base URL</h3>
<p>The base URL for all endpoints is <code>http://localhost:8080/patients</code>.</p>

<h3>Endpoints</h3>

<h4>1. Get All Patients</h4>
<ul>
    <li><strong>URL:</strong> <code>/listOfPatients</code></li>
    <li><strong>Method:</strong> <code>GET</code></li>
    <li><strong>Description:</strong> Retrieves a list of all patients.</li>
    <li><strong>Response:</strong> A JSON array of patient objects.</li>
</ul>

<h4>2. Search Patients</h4>
<ul>
    <li><strong>URL:</strong> <code>/search</code></li>
    <li><strong>Method:</strong> <code>GET</code></li>
    <li><strong>Parameters:</strong>
        <ul>
            <li><code>condition</code> (optional): Search by medical condition.</li>
            <li><code>assignedTherapist</code> (optional): Search by assigned therapist.</li>
        </ul>
    </li>
    <li><strong>Description:</strong> Retrieves a list of patients based on search criteria. If no parameters are provided, it returns all patients.</li>
    <li><strong>Response:</strong> A JSON array of patient objects matching the search criteria.</li>
</ul>

<h4>3. Create a Patient</h4>
<ul>
    <li><strong>URL:</strong> <code>/addPatient</code></li>
    <li><strong>Method:</strong> <code>POST</code></li>
    <li><strong>Description:</strong> Adds a new patient to the database.</li>
    <li><strong>Request Body:</strong> A JSON object representing the patient.</li>
    <li><strong>Response:</strong> The created patient object.</li>
</ul>

<h4>4.Patient Information</h4>
<ul>
    <li><strong>URL:</strong> <code>/{id} MongoDb Genereated id</code></li>
    <li><strong>Method:</strong> <code>GET</code></li>
    <li><strong>Description:</strong> Fetch whole information from patient ID.</li>
    <li><strong>Response:</strong> <code>201 Content</code> on successful Fetching.</li>
</ul>
<h4>5.Update Patient Information</h4>
<ul>
    <li><strong>URL:</strong> <code>/{id} MongoDb Genereated id</code></li>
    <li><strong>Method:</strong> <code>PUT</code></li>
    <li><strong>Description:</strong> Update the whole information By Using Id.</li>
    <li><strong>Response:</strong> <code>201 Updated</code> on successful Updation</li>
</ul>
<h4>6. Delete a Patient</h4>
<ul>
    <li><strong>URL:</strong> <code>/{id}</code></li>
    <li><strong>Method:</strong> <code>DELETE</code></li>
    <li><strong>Description:</strong> Deletes a patient by ID.</li>
    <li><strong>Response:</strong> <code>204 No Content</code> on successful deletion.</li>
</ul>

<h3>Data Model</h3>
<p>The <code>Patient</code> model includes the following fields:</p>
<ul>
    <li><code>id</code>: String (automatically generated)</li>
    <li><code>name</code>: String</li>
    <li><code>age</code>: Integer</li>
    <li><code>condition</code>: String</li>
    <li><code>assignedTherapist</code>: String</li>
    <li><code>contactInfo</code>: String</li>
</ul>

<h3>Example</h3>
<p>To search for patients with the condition "Parkinson's" assigned to "Dr. Sarah Connor":</p>
<pre><code>GET http://localhost:8080/patients/search?condition=Parkinson’s&assignedTherapist=Dr. Sarah Connor</code></pre>

<h2>Notes</h2>
<ul>
    <li>Ensure MongoDB is running on your local machine before starting the backend server.</li>
    <li>The frontend and backend should be run simultaneously to allow full interaction with the application.</li>
    <li>Customize the MongoDB connection settings as needed in the <code>application.properties</code> file.</li>
</ul>
