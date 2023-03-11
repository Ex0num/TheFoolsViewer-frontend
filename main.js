// PUUID's de distintas accs NO - AHORA ES "ID"
const usuarios_insertados = 
[
    "RxQFcX6l_WmOwhMwzmzpkgVGtQq4EZ5FdwVFWI_fE9KP8JA", //Thomy (MAIN)
    "9IjkTELeH0LWJQS9UcpVVoK9dWc8hiEhCS7Gpe73c2sA_w", //Gaby (MAIN)
    "1RNK1zY-JEBREIaEanev_mQW2KWirAsxoKOWC5Tsse_4tg", //Triky (MAIN)
    "e0rpd1SD_14CZc-_60tNTtrTWJ643pw-0nKHsTZ-QCyU-g", //Ivo (MAIN)
    "EprSpg7jpL9V2K-NeBewCWywt_3xAG9VqBmXW_TdMGkGJw", //Agus (MAIN)
    "isLvrqJwcikcV8u9lk8gDn1YJ5dU7cdovmNdQTyRAgeoY2mwW-_SopyDPA", //Guido (CHALLY)
    "sk87DFeyCInogMyG1ULyMgf6licgiQgdJmsVYJspLbiL7A", //Juan (MAIN)
    "2PyroTMGzQuanQDvpoueI-E8Z2_5WtuaCyz4nlk9Tluk9A", //Guido (MAIN)
    "NkZznLIkzOK7iIT-3HpUPqbPZrCTU05PUnFxBDM7ovuXo2c", //Moti (MAIN)
    "uBj1o_hjGc5LZ5eudHb0XDYpeNI3nQXCAc-TCLFXS0NKfw", //Chola (MAIN)
    "U5NMUcj8JEjoQcW1oYH9UH8nJO-b3d7k0XLadB9a7IhCRA", //Ale (MAIN)
    "l5_FrQsY02hVaOtkQeFH2wq-xwQd8GtM2bqEsZbql1nz00M" // Ivo (SMURF)
]


// SweetAlert
setTimeout(() => 
{
    swal("¡Estamos en pre-alpha!", "Recuerda que estamos iniciando en este proyecto y todo tipo de error podrá ser reportado en el repositorio de Github. https://github.com/Ex0num/TheFoolsViewer/issues o comunicado al Discord EXONUM#5778", "info");
}, 1500);

// ================================== Ejecucion de codigo ======================================= //
funcion_main_wholeDataUF();

// ================================ Funcion - Padre/Main ======================================= //
function funcion_main_wholeData() 
{
    // Consulta al back-end y espera que traiga todos los datos del ranking de lol
    fetch('https://the-fools-viewer.onrender.com/league-ranking')
    .then((response) => response.json())
    .then((json_data_obtenida) => 
    {
        console.log(json_data_obtenida);

        let array_data_obtenida = [];
        json_data_obtenida.forEach(element => 
        {
            array_data_obtenida.push(element);
        });

        console.log(array_data_obtenida);
        acciones_finales(array_data_obtenida); 
    });
}

function funcion_main_wholeDataUF() 
{
    let array_data_total_obtenida = [];

    let usuarios_insertados = 
    [
        "RxQFcX6l_WmOwhMwzmzpkgVGtQq4EZ5FdwVFWI_fE9KP8JA", //Thomy (MAIN)
        "9IjkTELeH0LWJQS9UcpVVoK9dWc8hiEhCS7Gpe73c2sA_w", //Gaby (MAIN)
        "1RNK1zY-JEBREIaEanev_mQW2KWirAsxoKOWC5Tsse_4tg", //Triky (MAIN)
        "e0rpd1SD_14CZc-_60tNTtrTWJ643pw-0nKHsTZ-QCyU-g", //Ivo (MAIN)
        "EprSpg7jpL9V2K-NeBewCWywt_3xAG9VqBmXW_TdMGkGJw", //Agus (MAIN)
        "isLvrqJwcikcV8u9lk8gDn1YJ5dU7cdovmNdQTyRAgeoY2mwW-_SopyDPA", //Guido (CHALLY)
        "sk87DFeyCInogMyG1ULyMgf6licgiQgdJmsVYJspLbiL7A", //Juan (MAIN)
        "2PyroTMGzQuanQDvpoueI-E8Z2_5WtuaCyz4nlk9Tluk9A", //Guido (MAIN)
        "NkZznLIkzOK7iIT-3HpUPqbPZrCTU05PUnFxBDM7ovuXo2c", //Moti (MAIN)
        "uBj1o_hjGc5LZ5eudHb0XDYpeNI3nQXCAc-TCLFXS0NKfw", //Chola (MAIN)
        "U5NMUcj8JEjoQcW1oYH9UH8nJO-b3d7k0XLadB9a7IhCRA", //Ale (MAIN)
        "l5_FrQsY02hVaOtkQeFH2wq-xwQd8GtM2bqEsZbql1nz00M" // Ivo (SMURF)
    ]

    contador = 0;
    
    function buscarPlayer()
    {
        //Le pregunto al back-end por la data de un player. 
        //(Luego 'http://localhost:3000/player-data' es reemplazado por el link publico de la api)
        fetch('http://localhost:3000/player-data', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({playerID: usuarios_insertados[contador]})
        })
        .then(response => response.json())
        .then(data => 
        {
            console.log(data);
            array_data_total_obtenida.push(data);
            cargar_data_a_tabla_oneUser(data);

            if (contador < usuarios_insertados.length - 1) 
            {
                contador++;
                buscarPlayer();
            }
            else
            {
                console.log("FINALIZADO");
                acciones_finales_UF(array_data_total_obtenida);
            }
        })
        .catch(error => {console.error('Error:', error);});
    }
    
    buscarPlayer();
}

function acciones_finales(array_informacion_total_obtenida) 
{
    // Iteracion de data_usuarios terminada. Toca cargar data a tabla toda la informacion.
    console.log("");
    console.log(" ------ IMPRESION FINAL -----");
    console.log(array_informacion_total_obtenida);

    ordenar_informacion_total(array_informacion_total_obtenida)
    .then((informacion_total_ordenada)=>
    {
        console.log();
        cargar_data_a_tabla(informacion_total_ordenada);
        presentacion_final_css();
    });
}

function acciones_finales_UF(array_informacion_total_obtenida) 
{
    // Se elimina el loader
    let mensaje_esperando = document.getElementById("mensaje-esperando");
    mensaje_esperando.setAttribute("hidden","true");

    ordenar_informacion_total(array_informacion_total_obtenida)
    .then((informacion_total_ordenada)=>
    {
        console.log();
        console.log("ARRAY ORDENADO");
        console.log(informacion_total_ordenada);

        // Limpiar data desordenada 
        let array_todas_las_filas = document.querySelectorAll(".fila-data-jugador");
        array_todas_las_filas.forEach((fila) => 
        {
            fila.style.animation = "tracking-out-contract 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both";
            setTimeout(() => {fila.parentNode.removeChild(fila);}, 1250);
        });

        // Se debe esperar a la animacion de exit de la limpieza de la informacion desordenada
        setTimeout(() => {refrescar_data_de_tabla(informacion_total_ordenada);}, 1000);
    });
}

// Funcion que asigna animaciones finales a la tabla post-cargar la data
function presentacion_final_css()
{
    let mensaje_esperando = document.getElementById("mensaje-esperando");
    mensaje_esperando.setAttribute("hidden","true");

    let tabla_lol = document.getElementById("tabla-lol");
    tabla_lol.removeAttribute("hidden");
    tabla_lol.style.animation = "flip-in-ver-left 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
}

// Funcion que recibe un array de informacion de invocadores y los ordena por rango y pl
function ordenar_informacion_total(array_informacion_total)
{
    return new Promise( (resolve) => 
    {
        setTimeout(() =>
        {
            let huboSwap;
            let summoner_Auxiliar;
        
            console.log("");
            console.log("---- INICIANDO ORDENAMIENTO ----");
    
            do 
            {
                huboSwap = false;
    
                for (let i = 0; i < array_informacion_total.length; i++) 
                {
                    if((i + 1) != array_informacion_total.length)
                    {
                        if(array_informacion_total[i]["data_league"]["orderNumber"] > array_informacion_total[i+1]["data_league"]["orderNumber"])
                        {
                            huboSwap = true;
                            summoner_Auxiliar = array_informacion_total[i];
        
                            // Swap
                            array_informacion_total[i] = array_informacion_total[i+1];
                            array_informacion_total[i+1] = summoner_Auxiliar;
                        }
                        else if(array_informacion_total[i]["data_league"]["orderNumber"] == array_informacion_total[i+1]["data_league"]["orderNumber"])
                        {
                            // En caso de tener la misma liga con division, gana el de mas pl
                            if(array_informacion_total[i]["data_league"]["lp"] < array_informacion_total[i+1]["data_league"]["lp"])
                            {
                                huboSwap = true;
                                summoner_Auxiliar = array_informacion_total[i];
            
                                // Swap
                                array_informacion_total[i] = array_informacion_total[i+1];
                                array_informacion_total[i+1] = summoner_Auxiliar;
                            }  
                            else if(array_informacion_total[i]["data_league"]["lp"] == array_informacion_total[i+1]["data_league"]["lp"])
                            {
                                // En caso de tener el mismo PL gana el de mas winrate
                                if(array_informacion_total[i]["data_league"]["winrate"] < array_informacion_total[i+1]["data_league"]["winrate"])
                                {
                                    huboSwap = true;
                                    summoner_Auxiliar = array_informacion_total[i];
                
                                    // Swap
                                    array_informacion_total[i] = array_informacion_total[i+1];
                                    array_informacion_total[i+1] = summoner_Auxiliar;
                                }
                                else if(array_informacion_total[i]["data_league"]["winrate"] == array_informacion_total[i+1]["data_league"]["winrate"])
                                {
                                    // En caso de tener la misma liga, division, pl y winrate gana el que mas jugo
                                    if(array_informacion_total[i]["data_league"]["played"] < array_informacion_total[i+1]["data_league"]["played"])
                                    {
                                        huboSwap = true;
                                        summoner_Auxiliar = array_informacion_total[i];
                    
                                        // Swap
                                        array_informacion_total[i] = array_informacion_total[i+1];
                                        array_informacion_total[i+1] = summoner_Auxiliar;
                                    }
                                }
                            }
                        }
                    }       
                }
                
            } while (huboSwap == true);

            resolve(array_informacion_total);

        }, 1500);
    });
}

// Carga los datos obtenidos a la tabla
function cargar_data_a_tabla(informacion_total_recibida_y_ordenada)
{
    console.log("");
    console.log(" ------ INICIANDO CARGA A TABLA ------");
    let tabla_html = document.getElementById("tabla-lol");

    informacion_total_recibida_y_ordenada.forEach( (element, index) =>
    {
        // Creacion de la fila de data total
        let nueva_fila = document.createElement("tr");
        nueva_fila.classList = "fila-data-jugador";

        // Creacion de cada celda de data
        let celda_position = document.createElement("td");
        celda_position.classList = "celda-position";

        let celda_rank = document.createElement("td");
        celda_rank.classList = "celda-rank";

        let celda_summoner = document.createElement("td");
        celda_summoner.classList = "celda-summoner";

        let celda_league = document.createElement("td");
        celda_league.classList = "celda-league";

        let celda_points = document.createElement("td");
        celda_points.classList = "celda-points";

        let celda_played = document.createElement("td");
        celda_played.classList = "celda-played";

        let celda_winrate = document.createElement("td");
        celda_winrate.classList = "celda-winrate";

        let celda_wins = document.createElement("td");
        celda_wins.classList = "celda-wins";

        let celda_loses = document.createElement("td");
        celda_loses.classList = "celda-loses";

        let celda_opgg = document.createElement("td");
        celda_opgg.classList = "celda-opgg";
        let link_opgg = document.createElement("a");
        link_opgg.setAttribute("target","_blank");
        link_opgg.setAttribute("href",element.data_account["opgg"]);
        celda_opgg.appendChild(link_opgg);

        //Ensanchamiento de celdas a fila
        nueva_fila.appendChild(celda_position);
        nueva_fila.appendChild(celda_rank);
        nueva_fila.appendChild(celda_summoner);
        nueva_fila.appendChild(celda_league);
        nueva_fila.appendChild(celda_points);
        nueva_fila.appendChild(celda_played);
        nueva_fila.appendChild(celda_winrate);
        nueva_fila.appendChild(celda_wins);
        nueva_fila.appendChild(celda_loses);
        nueva_fila.appendChild(celda_opgg);

        //Agregado de informacion a cada celda
        celda_position.innerHTML = index + 1 + "°";

        let img_rank = document.createElement("img");
        let src_img_rank_calculado = devolverSRC_rango_correspondiente(element.data_league["tier"]);
        img_rank.setAttribute("src",src_img_rank_calculado);
        img_rank.classList = "foto-rank";
        celda_rank.appendChild(img_rank);

        celda_summoner.innerHTML = element.data_account["nombreInvocador"];
        celda_league.innerHTML = element.data_league["tier"] + " " + element.data_league["rank"];
        celda_points.innerHTML = element.data_league["lp"] + " " + "LP";
        celda_played.innerHTML = element.data_league["played"];
        celda_winrate.innerHTML = element.data_league["winrate"] + "%";
        celda_wins.innerHTML = element.data_league["wins"];
        celda_loses.innerHTML = element.data_league["loses"];
        link_opgg.innerHTML = element.data_account["opgg"];

        tabla_html.appendChild(nueva_fila);
    });
}

// Carga los datos obtenidos a la tabla
function refrescar_data_de_tabla(informacion_total_recibida_y_ordenada)
{
    console.log("");
    console.log(" ------ INICIANDO REFRESH DE TABLA ------");
    let tabla_html = document.getElementById("tabla-lol");

    // Agregar data ordenada
    informacion_total_recibida_y_ordenada.forEach( (element, index) =>
    {
        // Creacion de la fila de data total
        let nueva_fila = document.createElement("tr");
        nueva_fila.classList = "fila-data-jugador";

        // Creacion de cada celda de data
        let celda_position = document.createElement("td");
        celda_position.classList = "celda-position";

        let celda_rank = document.createElement("td");
        celda_rank.classList = "celda-rank";

        let celda_summoner = document.createElement("td");
        celda_summoner.classList = "celda-summoner";

        let celda_league = document.createElement("td");
        celda_league.classList = "celda-league";

        let celda_points = document.createElement("td");
        celda_points.classList = "celda-points";

        let celda_played = document.createElement("td");
        celda_played.classList = "celda-played";

        let celda_winrate = document.createElement("td");
        celda_winrate.classList = "celda-winrate";

        let celda_wins = document.createElement("td");
        celda_wins.classList = "celda-wins";

        let celda_loses = document.createElement("td");
        celda_loses.classList = "celda-loses";

        let celda_opgg = document.createElement("td");
        celda_opgg.classList = "celda-opgg";
        let link_opgg = document.createElement("a");
        link_opgg.setAttribute("target","_blank");
        link_opgg.setAttribute("href",element.data_account["opgg"]);
        celda_opgg.appendChild(link_opgg);

        //Ensanchamiento de celdas a fila
        nueva_fila.appendChild(celda_position);
        nueva_fila.appendChild(celda_rank);
        nueva_fila.appendChild(celda_summoner);
        nueva_fila.appendChild(celda_league);
        nueva_fila.appendChild(celda_points);
        nueva_fila.appendChild(celda_played);
        nueva_fila.appendChild(celda_winrate);
        nueva_fila.appendChild(celda_wins);
        nueva_fila.appendChild(celda_loses);
        nueva_fila.appendChild(celda_opgg);

        //Agregado de informacion a cada celda
        celda_position.innerHTML = index + 1 + "°";

        let img_rank = document.createElement("img");
        let src_img_rank_calculado = devolverSRC_rango_correspondiente(element.data_league["tier"]);
        img_rank.setAttribute("src",src_img_rank_calculado);
        img_rank.classList = "foto-rank";
        celda_rank.appendChild(img_rank);

        celda_summoner.innerHTML = element.data_account["nombreInvocador"];
        celda_league.innerHTML = element.data_league["tier"] + " " + element.data_league["rank"];
        celda_points.innerHTML = element.data_league["lp"] + " " + "LP";
        celda_played.innerHTML = element.data_league["played"];
        celda_winrate.innerHTML = element.data_league["winrate"] + "%";
        celda_wins.innerHTML = element.data_league["wins"];
        celda_loses.innerHTML = element.data_league["loses"];
        link_opgg.innerHTML = element.data_account["opgg"];

        tabla_html.appendChild(nueva_fila);
        nueva_fila.style.animation = "tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both";
    });
}

// Carga el dato obtenido a la tabla
function cargar_data_a_tabla_oneUser(obj_data_total_del_user)
{
    console.log("");
    console.log(" ------ INICIANDO CARGA SINGULAR A TABLA ------");
    let tabla_html = document.getElementById("tabla-lol");

    // Creacion de la fila de data total
    let nueva_fila = document.createElement("tr");
    nueva_fila.setAttribute("hidden","true");
    nueva_fila.classList = "fila-data-jugador";

    // Creacion de cada celda de data
    let celda_position = document.createElement("td");
    celda_position.classList = "celda-position";

    let celda_rank = document.createElement("td");
    celda_rank.classList = "celda-rank";

    let celda_summoner = document.createElement("td");
    celda_summoner.classList = "celda-summoner";

    let celda_league = document.createElement("td");
    celda_league.classList = "celda-league";

    let celda_points = document.createElement("td");
    celda_points.classList = "celda-points";

    let celda_played = document.createElement("td");
    celda_played.classList = "celda-played";

    let celda_winrate = document.createElement("td");
    celda_winrate.classList = "celda-winrate";

    let celda_wins = document.createElement("td");
    celda_wins.classList = "celda-wins";

    let celda_loses = document.createElement("td");
    celda_loses.classList = "celda-loses";

    let celda_opgg = document.createElement("td");
    celda_opgg.classList = "celda-opgg";
    let link_opgg = document.createElement("a");
    link_opgg.setAttribute("target","_blank");
    link_opgg.setAttribute("href",obj_data_total_del_user.data_account["opgg"]);
    celda_opgg.appendChild(link_opgg);

    //Ensanchamiento de celdas a fila
    nueva_fila.appendChild(celda_position);
    nueva_fila.appendChild(celda_rank);
    nueva_fila.appendChild(celda_summoner);
    nueva_fila.appendChild(celda_league);
    nueva_fila.appendChild(celda_points);
    nueva_fila.appendChild(celda_played);
    nueva_fila.appendChild(celda_winrate);
    nueva_fila.appendChild(celda_wins);
    nueva_fila.appendChild(celda_loses);
    nueva_fila.appendChild(celda_opgg);

    //Agregado de informacion a cada celda
    celda_position.innerHTML = "? " + "°";

    let img_rank = document.createElement("img");
    let src_img_rank_calculado = devolverSRC_rango_correspondiente(obj_data_total_del_user.data_league["tier"]);
    img_rank.setAttribute("src",src_img_rank_calculado);
    img_rank.classList = "foto-rank";
    celda_rank.appendChild(img_rank);

    celda_summoner.innerHTML = obj_data_total_del_user.data_account["nombreInvocador"];
    celda_league.innerHTML = obj_data_total_del_user.data_league["tier"] + " " + obj_data_total_del_user.data_league["rank"];
    celda_points.innerHTML = obj_data_total_del_user.data_league["lp"] + " " + "LP";
    celda_played.innerHTML = obj_data_total_del_user.data_league["played"];
    celda_winrate.innerHTML = obj_data_total_del_user.data_league["winrate"] + "%";
    celda_wins.innerHTML = obj_data_total_del_user.data_league["wins"];
    celda_loses.innerHTML = obj_data_total_del_user.data_league["loses"];
    link_opgg.innerHTML = obj_data_total_del_user.data_account["opgg"];

    //Una vez que se termino la carga de datos a la fila...
    tabla_html.appendChild(nueva_fila);
    nueva_fila.removeAttribute("hidden");
    nueva_fila.style.animation = "tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both";
}

function devolverSRC_rango_correspondiente(rango_recibido) 
{
    let resultado_src;
    rango_recibido = rango_recibido.toLowerCase();

    switch (rango_recibido)
    {
        case "challenger":
        {
            resultado_src = "./assets/league-of-legends/ranked-emblem/challenger-icon.png";
            break;
        }
        case "grandmaster":
        {
            resultado_src = "./assets/league-of-legends/ranked-emblem/grandmaster-icon.png";
            break;
        }
        case "master":
        {
            resultado_src = "./assets/league-of-legends/ranked-emblem/master-icon.png";
            break;
        }
        case "diamond":
        {
            resultado_src = "./assets/league-of-legends/ranked-emblem/diamond-icon.png";
            break;
        }
        case "platinum":
        {
            resultado_src = "./assets/league-of-legends/ranked-emblem/platinum-icon.png";
            break;
        }
        case "gold":
        {
            resultado_src = "./assets/league-of-legends/ranked-emblem/gold-icon.png";
            break;
        }
        case "silver":
        {
            resultado_src = "./assets/league-of-legends/ranked-emblem/silver-icon.png";
            break;
        }
        case "bronze":
        {
            resultado_src = "./assets/league-of-legends/ranked-emblem/bronze-icon.png";
            break;
        }
        case "iron":
        {
            resultado_src = "./assets/league-of-legends/ranked-emblem/iron-icon.png";
            break;
        }
        case "unranked":
        {
            resultado_src = "./assets/league-of-legends/ranked-emblem/unranked-icon.png";
            break;
        }
    }

    return resultado_src;
}