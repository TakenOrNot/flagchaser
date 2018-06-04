// ------------------------------------------------------------------------
//   Flag Chaser for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {

        initEvents ();
        
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );
        SWAM.on ( 'CTF_FlagEvent', onFlagEvent );
        // SWAM.on( 'playerKilled', onPlyrKilled )
    }

    SWAM.on ( 'gameLoaded', init );
      
    jQuery.fn.justtext = function() {
  
        return $(this)	.clone()
                .children()
                .remove()
                .end()
                .text();

    };
    
    window.chaseflag = 0;
    window.carrierid = 0;
    
    function speccarrier( carriername ){
       
        carrierobj = Players.getByName(carriername); 
        carrierid = carrierobj['id']; 
        Network.sendCommand("spectate", carrierid + "");
        // if the carrier dies, go in free camera mode
        // function carrierKilled(data, dead, killer){
        //function onPlyrKilled(data, dead, killer) {
        $(body).unbind('plyrkilledeventhandler');
        $(body).bind('plyrkilledeventhandler', function(){
              SWAM.on("playerKilled", function (data, dead, killer){
                    if (dead.id === carrierid){
                        // the carrier died
                        console.log(carriername + " died, killed by " + killer.name);
                        // carriername = '';
                        // carrierobj = '';
                        // carrierid = '';
                        // not sure its a good place for this
                        //SWAM.off("playerKilled", "**" );
                        //Network.sendCommand("spectate", game.myID + "");
                        $("#btnFreeSpectator").click();

                     }
                });
        });

            
        //}
        
        
    }
    
    function flagchase( flagchaseteam ){
        
        var carriername = '';
        
        chaseflag = flagchaseteam;
        console.log("chase flag " + flagchaseteam);
        
        // if somebody is already carrying flag, spectate him
        if ( chaseflag === 1) {

            var carriername = $( "#blueflag-name" ).justtext();
            var flagcolor = "blue";
            var basecoordx = -9385;
            var basecoordy = -1560;
        
        } else if ( chaseflag === 2) {

            var carriername = $( "#redflag-name" ).justtext();
            var flagcolor = "red";
            var basecoordx = 8260;
            var basecoordy = -1055;
            
        }
        //$( "#scorecontainer:contains('carriername')" ).parent().parent().parent().data('player-id'); 
        //$( "#scorecontainer:contains('carriername')" ).closest('.item').data('player-id');
                
        if (carriername.length > 0){
            console.log(flagcolor + " flag beeing carried by " + carriername);
            speccarrier(carriername);
                    
        }
        else {
            // nobody is carrying it, flag probably (?) in its base
            SWAM.off("playerKilled", "**" );
            // check if already in free camera mode
            spectag = $( "#spectator-tag" ).justtext();
            myname = Players.getMe().name;
            freecammode = "Spectating " + myname;
            
            if (spectag === freecammode){
                
                console.log("already in free camera mode");
                    
            } else {
                
                console.log("switching to free camera mode");
                $("#btnFreeSpectator").click();
                        
            }
                    
            // $("#btnFreeSpectator").click();
            // BUGGY: free camera to base
            console.log("camera go to " + flagcolor + " base");
            window.setTimeout(function () {
                Graphics.setCamera(basecoordx, basecoordy);
            },2000);
                    
        }
        
        
    }
    
    /* GUI */
    
    $("body").append("<div id='flagchasercontainer' style='display: none;'><div id='btnchaseblueflag' style='display: block; position: absolute;left: 50%;margin: -75px;bottom: 300px;width: 150px;height: 25px;padding: 5px;background: rgba(46,110,236,0.5);border-radius: 5px;text-align: center;color: #b4b4b4;font-size: 15px;cursor: pointer;'>Chase Blue Flag</div><div id='btnchaseredflag' style='display: block; position: absolute;left: 50%;margin: -75px;bottom: 250px;width: 150px;height: 25px;padding: 5px;background: rgba(188,42,47,0.5);border-radius: 5px;text-align: center;color: #b4b4b4;font-size: 15px;cursor: pointer;'>Chase Red Flag</div></div>");
    
    $("#btnchaseblueflag").click(function(){
        flagchase(1);
        $( this ).css({background: "rgba(46,110,236,0.9)"});
        $("#btnchaseredflag").css({background: "rgba(188,42,47,0.5)"});
    });
    $("#btnchaseredflag").click(function(){
        flagchase(2);
        $( this ).css({background: "rgba(188,42,47,0.9)"});
        $("#btnchaseblueflag").css({background: "rgba(46,110,236,0.5)"});
    });
    
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
            
            console.log("v key pressed, spectating player id " + game.spectatingID + ", show Flag Chaser GUI"); 
            // game.spectatingID is not reliable, as it is null at first when spectating, until we spectate another player
            $("#flagchasercontainer").css({display: "block"});
            SWAM.on("playerRespawned", function(data){
                respawnedid = data['id'];
                if (respawnedid == Players.getMe().id){
                    console.log("player respawned, hide Flag Chaser GUI");
                    $("#flagchasercontainer").css({display: "none"});
                }

            });
          
        }
        
        if ( event.originalEvent.key === 'o' ) { //TODO: This should be customizable

            event.stopImmediatePropagation ();
            // console.log("chase blue flag");  
            // chaseflag = 1;
            flagchase(1);
          
        }
        
        if ( event.originalEvent.key === 'p' ) { //TODO: This should be customizable

            event.stopImmediatePropagation ();
            // console.log("chase red flag");  
            //chaseflag = 2;
            flagchase(2);
          
        }

    }
    
    function onFlagEvent ( event, team, verb ) {
        
        
        // first, check if we are already spectating
        
        if( $('#btnFreeSpectator').css('display') == 'block' ) {
            console.log("flag event = " + team + " " + verb);
            console.log("chase flag = " + chaseflag);
            
            if ( chaseflag === 1) {
                var carriername = '';
                var carriername = $( "#blueflag-name" ).justtext();
                var flagcolor = "blue";
                // var basecoordx = -9385;
                // var basecoordy = -1560;

            } else if ( chaseflag === 2) {
                var carriername = '';    
                var carriername = $( "#redflag-name" ).justtext();
                var flagcolor = "red";
                // var basecoordx = 8260;
                // var basecoordy = -1055;

            }
            
            if ( team === 1 && chaseflag === 1) {

                // var carriername = $( "#blueflag-name" ).justtext();                
                
                if (carriername.length > 0){
                    console.log(flagcolor + " flag taken by " + carriername);
                    speccarrier(carriername);
                    
                }
                else {
                    // returned/captured
                    // TODO: check flagevent to know if returned/captured
                    // BUGGY: free camera to blue base
                    // note : free camera back to base seems to work on return, but not on capture (??)
                    console.log(flagcolor + " flag " + verb);
                    // $("#btnFreeSpectator").click();
                    window.setTimeout(function () {
                        // Graphics.setCamera(-9385, -1560);
                        $("#btnchaseblueflag").click();
                        
                    },2000);
                }
            } else if ( team === 2 && chaseflag === 2) {

                // var carriername = $( "#redflag-name" ).justtext();
                
                if (carriername.length > 0){
                    console.log(flagcolor + " flag taken by " + carriername);
                    speccarrier(carriername);
                    
                }
                else {
                    // returned/captured
                    // TODO: check flagevent to know if returned/captured
                    // BUGGY: free camera to red base
                    // note : free camera back to base seems to work on return, but not on capture (??)
                    console.log(flagcolor + " flag " + verb);
                    // TODO: forget about previously carrying player
                    // as there is no flagdrop event, we do this here (better late than never)
                    // TODO: check if theres a flagdrop event
                    // SWAM.off("playerKilled", carrierKilled);
                    
                    // $("#btnFreeSpectator").click();
                    window.setTimeout(function () {
                        // Graphics.setCamera(8260, -1055);
                        $("#btnchaseredflag").click();
                        
                    },2000);
                }    
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
    
}();