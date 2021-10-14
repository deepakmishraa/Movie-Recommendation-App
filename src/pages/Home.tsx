// importing all the file an library 
import { useEffect, useRef, useState } from "react";
import React, { Component } from 'react';
import axios from "axios";
import { IonInput, IonBackButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonButtons, IonButton, IonGrid, IonIcon, IonRow, IonCol, IonList, IonFooter, IonItem, IonThumbnail, IonImg, IonLabel, IonSearchbar } from '@ionic/react';
import { library, logoApple } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import Footer from '../components/FooterPage';
import './Home.css';

import MovieBox from "../components/MovieCard";




const Home: React.FC = () => {
  const [list, setList]: any = useState();
  let [page, setPage]: any = useState(1);
  const [searchTerm, setSearchTerm]: any = useState();
  const search = useRef<HTMLIonInputElement>(null);



  useEffect(() => {
    // axios: its use to handle api 
    // it can handle async request also therefore i use axios
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=531c8779023f70f5ec45da60cc337e58&language=en-US&page=${page}`
      )
      .then((response: any) =>

        setList(response.data.results),
      )
      .catch((err) => console.log(err));
  }, [page]);

  const handleOnSubmit = (e: any) => {

    e.preventDefault();

    const maindata = search.current?.value;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=531c8779023f70f5ec45da60cc337e58&query=${maindata}`
      )
      .then((response: any) => {
        if (response.data.results == "") {
          alert("not Found");

        } else {
          setList(response.data.results)
        }
      },
      )
      .catch((err) => console.log(err));
  }

  const handleOnChange = (e: any) => {
    setSearchTerm(e.target.value);
    console.log(e.target);
  }

  return (
    <>
      <IonPage>
        <IonHeader >
          <IonToolbar className="BgHeader">
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonTitle className="Header">Movies App</IonTitle>
                </IonCol>
                <IonCol size="6" size-md="4" offset-md="1" className="serchdiv">
                  <form onSubmit={handleOnSubmit}>
                    <IonInput
                      type="text"
                      className="searchbox"
                      placeholder="Search....."
                      value={searchTerm}
                      onChange={handleOnChange}
                      id="searchdata"
                      ref={search}
                    ></IonInput>
                  </form>

                </IonCol>
              </IonRow>
            </IonGrid>

          </IonToolbar>


        </IonHeader>

        <IonContent className="Bg">
          {/* not working properly  */}
          {/* <IonGrid >
            <IonRow >
              <IonCol size="4" >
              {list && list.map((movie:any) => <MovieBox list={movie} />)}
              </IonCol>
            
            </IonRow>
                
        </IonGrid> */}

          <div className="maindiv">

            <div className="container">
              <div className="grid">
                {list && list.map((movie: any) => <MovieBox list={movie} />)}
              </div>

            </div>
          </div>


        </IonContent>
        <IonFooter>
          {/* pagination of api   */}
          <div className="pagination">
            <a onClick={() => setPage(--page)}>&laquo;</a>
            <a onClick={() => setPage(1)}>1</a>
            <a className={`${page === 2 ? 'active' : ''}`} onClick={() => setPage(2)}>2</a>
            <a className={`${page === 3 ? 'active' : ''}`} onClick={() => setPage(3)}>3</a>
            <a className={`${page === 4 ? 'active' : ''}`} onClick={() => setPage(4)}>4</a>
            <a className={`${page === 5 ? 'active' : ''}`} onClick={() => setPage(5)}>5</a>
            <a className={`${page === 6 ? 'active' : ''}`} onClick={() => setPage(6)}>6</a>
            <a className={`${page === 7 ? 'active' : ''}`} onClick={() => setPage(7)}>7</a>


            <a onClick={() => setPage(++page)}>&raquo;</a>
          </div>

        </IonFooter>
      </IonPage>
    </>

  );
};

export default Home;
