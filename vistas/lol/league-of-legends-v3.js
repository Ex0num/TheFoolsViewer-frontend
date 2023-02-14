// ============================= Determinacion de recorrido ================================== //
// 1) Buscar al invocadores por PUUID's de cuentas y obtener su nombre actual.
// 2) Buscar el ID

// ================================== Ejecucion de codigo ======================================= //
funcion_main();

// ================================ Funcion - Padre/Main ======================================= //
function funcion_main() 
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

function devolverSRC_rango_correspondiente(rango_recibido) 
{
    let resultado_src;
    rango_recibido = rango_recibido.toLowerCase();

    switch (rango_recibido)
    {
        case "challenger":
        {
            resultado_src = "../../assets/games/league-of-legends/ranked-emblem/challenger-icon.png";
            break;
        }
        case "grandmaster":
        {
            resultado_src = "../../assets/games/league-of-legends/ranked-emblem/grandmaster-icon.png";
            break;
        }
        case "master":
        {
            resultado_src = "../../assets/games/league-of-legends/ranked-emblem/master-icon.png";
            break;
        }
        case "diamond":
        {
            resultado_src = "../../assets/games/league-of-legends/ranked-emblem/diamond-icon.png";
            break;
        }
        case "platinum":
        {
            resultado_src = "../../assets/games/league-of-legends/ranked-emblem/platinum-icon.png";
            break;
        }
        case "gold":
        {
            resultado_src = "../../assets/games/league-of-legends/ranked-emblem/gold-icon.png";
            break;
        }
        case "silver":
        {
            resultado_src = "../../assets/games/league-of-legends/ranked-emblem/silver-icon.png";
            break;
        }
        case "bronze":
        {
            resultado_src = "../../assets/games/league-of-legends/ranked-emblem/bronze-icon.png";
            break;
        }
        case "iron":
        {
            resultado_src = "../../assets/games/league-of-legends/ranked-emblem/iron-icon.png";
            break;
        }
        case "unranked":
        {
            resultado_src = "../../assets/games/league-of-legends/ranked-emblem/unranked-icon.png";
            break;
        }
    }

    return resultado_src;
}

