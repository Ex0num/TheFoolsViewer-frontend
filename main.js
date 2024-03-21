//--- SweetAlert mensaje ---//
setTimeout(() => 
{
    swal("¡Version 2.0 publicada!", 
    "La nueva versión 2.0 ya fue publicada.\nHay nuevos cambios realizados...\n"+
    "\n-Codigo rescrito, reorganizado y optimizado en su totalidad. Limpieza y ordenamiento."+
    "\n-Icono de fuego (Hotstreak - 3 partidas seguidas ganadas) nuevo."+
    "\n-Campos 'wins' y 'loses' ahora son resaltados."+
    "\n-Iconos de invocadores añadidos."+
    "\n-Rango esmeralda añadido."+
    "\n-Background nuevo."+
    "\n-Header removido.", "info");
}, 800);

// ================================== Ejecucion de codigo ======================================= //
data_jugadores = [];
start_process();

// ================================ Funcion - Padre/Main ======================================= //
async function start_process() 
{
    //--- IDS Usuarios buscados ---//
    let usuarios_analizados = 
    [
        {"nombre": "Toti (Main)", "id_invocador": "RxQFcX6l_WmOwhMwzmzpkgVGtQq4EZ5FdwVFWI_fE9KP8JA"},
        {"nombre": "Gaby (Main)", "id_invocador": "9IjkTELeH0LWJQS9UcpVVoK9dWc8hiEhCS7Gpe73c2sA_w"},
        {"nombre": "Gaby (Smurf) chad adc", "id_invocador": "jelz0i0T7kwSLFhqCyVhByAmADXz7vxN4jGw3byWAtNYIa0zW-MYDpikGA"},
        {"nombre": "Gaby (Smurf) Jikatuki", "id_invocador": "bkiT7osAyC-VoQyDxK2vyBmcs1Ef1VajS8OOwJ44nk4Xa1M"},
        {"nombre": "Triky (Main)", "id_invocador": "1RNK1zY-JEBREIaEanev_mQW2KWirAsxoKOWC5Tsse_4tg"},
        {"nombre": "Guido (Main)", "id_invocador": "2PyroTMGzQuanQDvpoueI-E8Z2_5WtuaCyz4nlk9Tluk9A"},
        {"nombre": "Ivo (Main)", "id_invocador": "e0rpd1SD_14CZc-_60tNTtrTWJ643pw-0nKHsTZ-QCyU-g"},
        {"nombre": "Agus (Main)", "id_invocador": "EprSpg7jpL9V2K-NeBewCWywt_3xAG9VqBmXW_TdMGkGJw"},
        {"nombre": "Guido (Smurf)", "id_invocador": "isLvrqJwcikcV8u9lk8gDn1YJ5dU7cdovmNdQTyRAgeoY2mwW-_SopyDPA"},
        {"nombre": "Juan (Main)", "id_invocador": "sk87DFeyCInogMyG1ULyMgf6licgiQgdJmsVYJspLbiL7A"},
        {"nombre": "Motiel (Main)", "id_invocador": "NkZznLIkzOK7iIT-3HpUPqbPZrCTU05PUnFxBDM7ovuXo2c"},
        {"nombre": "Chola (Main)", "id_invocador": "uBj1o_hjGc5LZ5eudHb0XDYpeNI3nQXCAc-TCLFXS0NKfw"},
        {"nombre": "Ale (Main)", "id_invocador": "U5NMUcj8JEjoQcW1oYH9UH8nJO-b3d7k0XLadB9a7IhCRA"},
        {"nombre": "Ivo (Smurf)", "id_invocador": "l5_FrQsY02hVaOtkQeFH2wq-xwQd8GtM2bqEsZbql1nz00M"},
        {"nombre": "Marculi (Main)", "id_invocador": "jK4qvnk1RIb5X03-FTtcdxpAabZYgbBoZXVdQtEqer4fnw"},
        {"nombre": "Joaco (Main)", "id_invocador": "ECqn_c2If9y7jRkqBH_aSKGLIIwPr8F4Yl-6ZxC_lyoW8txMVVyx_xTyQw"}
    ]
    
    await procesar_jugadores(usuarios_analizados)
}

async function procesar_jugadores(usuarios_insertados_recibidos)
{
    let response;
    let contador = 0;
    for (const data_usuario of usuarios_insertados_recibidos) 
    {
        try 
        {
            console.log(`\nSearching player: ${data_usuario.nombre} - ${data_usuario.id_invocador}`)
            response = await buscar_data_jugador(data_usuario);

            if (response)
            {
                let data_user_obtenido = await response.json()
                await asociar_nro_icon(data_user_obtenido);
                await ordenar_e_insertar_jugador_obtenido(data_user_obtenido);
                console.log(data_user_obtenido);
                await cargar_data_jugador_a_tabla(data_user_obtenido);
            }

            if (contador == usuarios_insertados_recibidos.length - 1) {finalizar_loading_tabla()}
        } 
        catch (error) {console.log(`Hubo un error durante la busqueda del jugador: ${data_usuario.nombre}`+error);}
        contador++;
    }
}

async function asociar_nro_icon(data_user_obtenido) {data_user_obtenido.data_account.icon_url = "./assets/league-of-legends/icons/"+data_user_obtenido.data_account.profileIconID.toString()+".jpg";}

async function buscar_data_jugador(user_data)
{
    try 
    {
        //--- Buscar en el back-end la data de un jugador ---//
        let response = fetch('https://the-fools-viewer.onrender.com/player-data',
        // let response = await fetch('http://localhost:3000/player-data',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({playerID: user_data.id_invocador})
        })

        return response;
    } 
    catch (error) {console.error('Error:', error);}
}

function ordenar_e_insertar_jugador_obtenido(usuario_a_ser_agregado) 
{
    console.log("Ordenando lista de jugadores e insertando al nuevo jugador obtenido: " + usuario_a_ser_agregado.data_account.nombreInvocador);
    return new Promise((resolve) => 
    {
        let usuario_insertado = false;

        for (let i = 0; i < data_jugadores.length; i++) 
        {
            const usuario_actual = data_jugadores[i];

            if (usuario_a_ser_agregado.data_league.orderNumber < usuario_actual.data_league.orderNumber ||
                (usuario_a_ser_agregado.data_league.orderNumber === usuario_actual.data_league.orderNumber &&
                    usuario_a_ser_agregado.data_league.lp > usuario_actual.data_league.lp) ||
                (usuario_a_ser_agregado.data_league.orderNumber === usuario_actual.data_league.orderNumber &&
                    usuario_a_ser_agregado.data_league.lp === usuario_actual.data_league.lp &&
                    usuario_a_ser_agregado.data_league.winrate > usuario_actual.data_league.winrate)) 
            {
                // Insertar el nuevo usuario en la posición actual
                data_jugadores.splice(i, 0, usuario_a_ser_agregado);
                usuario_insertado = true;
                break;
            }
        }

        // Si el usuario no se insertó en ninguna posición, lo agregamos al final
        if (!usuario_insertado) {
            data_jugadores.push(usuario_a_ser_agregado);
        }
        resolve(data_jugadores);
    });
}

async function cargar_data_jugador_a_tabla(obj_data_total_del_user) 
{
    console.log("");
    console.log(" ------ INICIANDO CARGA SINGULAR A TABLA ------");
    let tabla_html = document.getElementById("tabla-lol");

    // Creación de la fila de data total
    let nueva_fila = document.createElement("tr");
    nueva_fila.classList = "fila-data-jugador";

    // Creación de cada celda de data
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
    link_opgg.setAttribute("target", "_blank");
    link_opgg.setAttribute("href", obj_data_total_del_user.data_account["opgg"]);
    celda_opgg.appendChild(link_opgg);

    // Creación de la imagen del usuario
    let img_user = document.createElement("img");
    let src_img_profile = obj_data_total_del_user.data_account["icon_url"];
    img_user.setAttribute("src", src_img_profile);
    img_user.classList = "foto-icon";

    // Agregar la imagen al lado del nombre del usuario
    setTimeout(() => {
        // Obtener el primer hijo de celda_summoner
        let firstChild = celda_summoner.firstChild;
        // Insertar la imagen antes del primer hijo
        celda_summoner.insertBefore(img_user, firstChild);
        img_user.classList = "foto-user";
        // console.log(celda_summoner); // Asegúrate de que celda_summoner contenga la imagen
    }, 1500);

    // Agregado de información a cada celda
    celda_position.innerHTML = "? " + "°";

    let img_rank = document.createElement("img");
    let src_img_rank_calculado = obtener_src_foto_rango_correspondiente(obj_data_total_del_user.data_league["tier"]);
    img_rank.setAttribute("src", src_img_rank_calculado);
    img_rank.classList = "foto-rank";
    celda_rank.appendChild(img_rank);

    celda_summoner.innerHTML = obj_data_total_del_user.data_account["nombreInvocador"];
    celda_league.innerHTML = obj_data_total_del_user.data_league["tier"] + " " + obj_data_total_del_user.data_league["rank"];
    celda_points.innerHTML = obj_data_total_del_user.data_league["lp"] + " " + "LP";
    celda_played.innerHTML = obj_data_total_del_user.data_league["played"];
    celda_winrate.innerHTML = obj_data_total_del_user.data_league["winrate"] + "%";

    // Creación de la imagen del hotstreak
    if (obj_data_total_del_user.data_league.hotStreak)
    {
        let img_hotStreak = document.createElement("img");
        let src_img_hotStreak = "./assets/fuego.png";
        img_hotStreak.setAttribute("src", src_img_hotStreak);
        img_user.classList = "foto-hotstreak";
    
        // Agregar la imagen al lado del nombre del winrate
        setTimeout(() => 
        {
            // Obtener el primer hijo de celda_winrate
            let firstChild = celda_winrate.firstChild;
            // Insertar la imagen antes del primer hijo
            celda_winrate.insertBefore(img_hotStreak, firstChild);
            img_hotStreak.classList = "foto-hotstreak";
            console.log(celda_winrate); // Asegúrate de que celda_winrate contenga la imagen
        }, 1500);
    }

    celda_wins.innerHTML = obj_data_total_del_user.data_league["wins"];
    celda_loses.innerHTML = obj_data_total_del_user.data_league["loses"];
    link_opgg.innerHTML = obj_data_total_del_user.data_account["opgg"];

    // Obtener la posición correcta del jugador en la tabla
    let posicion = data_jugadores.findIndex((jugador) => jugador.data_account.nombreInvocador === obj_data_total_del_user.data_account.nombreInvocador);
    if (posicion === -1) 
    {
        console.error("No se encontró al jugador en la lista de jugadores ordenados.");
        return;
    }

    // Insertar la fila en la posición correspondiente en la tabla
    if (posicion === 0) 
    {
        tabla_html.insertBefore(nueva_fila, tabla_html.getElementsByClassName("fila-data-jugador")[0]); // Insertar antes de la primera fila de datos
    } 
    else 
    {
        let fila_anterior = tabla_html.getElementsByClassName("fila-data-jugador")[posicion - 1];
        fila_anterior.after(nueva_fila); // Insertar después de la fila anterior
    }

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

    nueva_fila.style.animation = "tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both";
}

function obtener_src_foto_rango_correspondiente(rango_recibido) 
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
        case "emerald":
        {
            resultado_src = "./assets/league-of-legends/ranked-emblem/emerald-icon.png";
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

function finalizar_loading_tabla() 
{
    let mensaje_esperando = document.getElementById("mensaje-esperando");
    mensaje_esperando.setAttribute("hidden", "true");

    let filas_jugadores = document.querySelectorAll(".fila-data-jugador");
    filas_jugadores.forEach((fila, index) => 
    {
        let celda_position = fila.querySelector(".celda-position");
        celda_position.textContent = (index + 1) + " °";
    });
}