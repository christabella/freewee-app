/******************************************************************************/
/******************************** SYNCHRONIZER ********************************/
/******************************************************************************/

var socket = io();
var sync = synchronizer.init('controller', socket);
var currentGame = 0;


/* Format of data:
 *      username: msg.username,
        id: msg.id,
        playerOrder: 1,
        success: true,
        msg: "Successfully joined room"
 * Format of err:
 *      msg: msg
 */
sync.onJoin(function(data, err){
  if (!err){
    fadeOut('join');
    setTimeout(function(){
      fadeIn('controller0')
    }, 1000);
    
    if ($('.displayusername').text()  == "") {
      $('.displayusername').text(sync.username);
    }
    if ($('.displaysumo').attr("src") == "") {
      $('.displaysumo').each(function(index) {
        $(this).attr("src", "/img/lobby/sumoPlayer" + sync.playerOrder + ".png");
      });
    }
    if ($('.displaysumobg').css('background-image') == "none") {
      $('.displaysumobg').css('background-image', 'url(/img/lobby/sumoPlayer' + sync.playerOrder + ".png)");
    }
  } else {
    alert(err.msg)
  }
});


/* Format of data:
 *    {gameId: gameId, success: true}
 * Format of err:
 *    {msg: msg}
 */
sync.onStartGame(function(data, err){
  if (!err){
    fadeOut('controller' + currentGame);
    setTimeout(function(){
      fadeIn('controller' + data.gameId); // controller1, controller2 ...
      currentGame = data.gameId;
    }, 1000);
    if (data.gameId === 3) {
      $('#head-crotch').css('visibility', 'hidden');
      $('#legs').css('visibility', 'hidden');
      $('#moobs').on( 'touchstart', function( event ) {
        setTimeout(function() {$('#head-crotch').css('visibility', 'visible');}, 20000);
        setTimeout(function() {$('#head-crotch').css('visibility', 'visible');}, 40000);
        $( this ).off( event );
      });
    }
  } else {
    alert(err.msg)
  }
});


function join(){
  sync.join($('#username').val(), $('#roomId').val());
}

/******************************************************************************/
/**************************** CONTROLLER UTILITIES ****************************/
/******************************************************************************/

function fadeOut(id){
  $('#' + id)
      .addClass('animated fadeOut')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this)
            .css('display', 'none')
            .removeClass('animated fadeOut');
        });
}

function fadeIn(id){
  $('#' + id)
      .css('display', 'block')
      .addClass('animated fadeIn')      
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this)
        .css('display', 'block')
        .removeClass('animated fadeIn')      
        });
}