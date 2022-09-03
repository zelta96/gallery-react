import {useState} from 'react';
import {Formik, Form, Field} from 'formik'
import './header.css'
import './content.css'
import './articles.css'

const App = () => {

  const [photos,setPhotos] =useState([])
  const open = url => window.open(url)
  console.log(photos);

  return (
    <div className="App">
      <header>
        <Formik
          initialValues={{search:''}}
          onSubmit={
            async values =>{
              const response =  await fetch(
                `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`
                ,{
                  headers:{
                    'Authorization' : 'Client-ID D66_csy4F_zpkYzmH3Kt1uAu1vDbaWB3_ECGh9-_VAI'
                  }
                }
              )
              const result = await response.json();
              setPhotos(result.results)
            }
          }
        >
          <Form>
            <Field name='search'></Field>
          </Form>
        </Formik>
      </header>
      <div className='container'>
          <div className='center'>
            {photos.map(
              elem => 
              <article key={elem.id} onClick={()=> open(elem.links.html)}>
                <img src={elem.urls.regular} alt={elem.alt_description}/>
                <p>{[elem.description,elem.alt_description].join('-')}</p>
              </article>)}
          </div>  
      </div>
    </div>
  );
}

export default App;
