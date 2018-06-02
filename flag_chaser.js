// ------------------------------------------------------------------------
//   Flag Chaser for StarMash
// ------------------------------------------------------------------------
(function () {
    /* INIT */
    function init () {

        initEvents ();
        
    }

    function initEvents () {

        SWAM.on ( 'CTF_FlagEvent', onFlagEvent );

    }

    SWAM.on ( 'gameLoaded', init );
    
    jQuery.fn.justtext = function() {
  
        return $(this)	.clone()
                .children()
                .remove()
                .end()
                .text();

    };
    // UI
    $("body").append("<div id='specflags' style='width: 200px; height: 100px; position: absolute; top: 40px; left: 400px;'><div id='specblue'>specblueflag</div><div id='specred'>specredflag</div></div>");
    
    /* EVENTS */
    //$("#gamespecific > .blueflag").click(function(){console.log("blueclicked");});
    
    $("specblue").click(function(){console.log("blueclicked");});
    $("specred").click(function(){console.log("redclicked");});
    
    function flagchase(team){
        if ( team === 1 ) {
            console.log("chase blue flag");
        }
        if ( team === 2 ) {
            console.log("chase red flag");
        }
    }
    function onFlagEvent ( event, team, verb ) {

        if ( team === 1 ) {
            
            // var carriername = $( "#blueflag-name" ).text();
            var carriername = $( "#blueflag-name" ).justtext();
            console.log("flag blue " + carriername);
            //$( "#scorecontainer:contains('carriername')" ).parent().parent().parent().data('player-id'); 
            //$( "#scorecontainer:contains('carriername')" ).closest('.item').data('player-id');
            if (carriername.length > 0){
                carrierobj = Players.getByName(carriername); 
                carrierid = carrierobj['id']; 
                Network.sendCommand("spectate", carrierid + "");
            }
        } else if ( team === 2 ) {
            
            // var carriername = $( "#redflag-name" ).text();
            //var carrierid = 
            var carriername = $( "#redflag-name" ).justtext();
            console.log("flag red " + carriername);
            if (carriername.length > 0){
                //Network.sendCommand("/Spectate " + carriername);
                carrierobj = Players.getByName(carriername); 
                carrierid = carrierobj['id']; 
                Network.sendCommand("spectate", carrierid + "");
            }
            
        }

        
      }
    
    /* REGISTER */

    SWAM.registerExtension ({
        name: 'Flag Chaser',
        id: 'FlagChaser',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}());