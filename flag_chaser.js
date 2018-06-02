// ------------------------------------------------------------------------
//   Flag Chaser for StarMash
// ------------------------------------------------------------------------
(function () {
    /* INIT */
    function init () {

        initEvents ();
        
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );
        SWAM.on ( 'CTF_FlagEvent', onFlagEvent );
        // SWAM.on( 'playerKilled', carrierKilled )
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
    
    function flagchase( flagchaseteam ){
        chaseflag = flagchaseteam;
        console.log("chase flag " + flagchaseteam);
    }
    
    /* EVENTS */
    
    $("body").append("<div id='btnchaseblueflag' style='display: block; position: absolute;left: 50%;margin: -75px;bottom: 300px;width: 150px;height: 25px;padding: 5px;background: rgba(0,0,0,0.5);border-radius: 5px;text-align: center;color: #b4b4b4;font-size: 15px;cursor: pointer;'>Chase blue flag</div><div id='btnchaseredflag' style='display: block; position: absolute;left: 50%;margin: -75px;bottom: 250px;width: 150px;height: 25px;padding: 5px;background: rgba(0,0,0,0.5);border-radius: 5px;text-align: center;color: #b4b4b4;font-size: 15px;cursor: pointer;'>Chase red flag</div>");
    
    $("#btnchaseblueflag").click(function(){flagchase(1)});
    $("#btnchaseredflag").click(function(){flagchase(2)});
    // $(document).ready(function() {
        // $(document).on("click",".blueflag",function(){
            // console.log("chase blue flag @GUI");
            // chaseflag = 1;
            // flagchase(1);
        // });
        // $(document).on("click",".redflag",function(){
            // console.log("chase red flag @GUI");
            // chaseflag = 2;
            // flagchase(2);
        // });
    //});
    
    function onKeydown ( event ) {

        if ( event.originalEvent.key === 'o' ) { //TODO: This should be customizable

          event.stopImmediatePropagation ();
          // console.log("chase blue flag");  
          // chaseflag = 1;
            flagchase(1);
          // TODO: check if the flag is already out, if yes spectate carrier   
        }
        
        if ( event.originalEvent.key === 'p' ) { //TODO: This should be customizable

          event.stopImmediatePropagation ();
          // console.log("chase red flag");  
          //chaseflag = 2;
            flagchase(2);
          // TODO: check if the flag is already out, if yes spectate carrier  
        }

    }
    
    function onFlagEvent ( event, team, verb ) {
        
        // first, check if we are already spectating
        
        if( $('#btnFreeSpectator').css('display') == 'block' ) {
            
            console.log("chaseflag = " + chaseflag);
            if ( team === 1 && chaseflag === 1) {

                // var carriername = $( "#blueflag-name" ).text();
                var carriername = $( "#blueflag-name" ).justtext();
                console.log("flag blue " + carriername);
                //$( "#scorecontainer:contains('carriername')" ).parent().parent().parent().data('player-id'); 
                //$( "#scorecontainer:contains('carriername')" ).closest('.item').data('player-id');
                if (carriername.length > 0){
                    carrierobj = Players.getByName(carriername); 
                    carrierid = carrierobj['id']; 
                    Network.sendCommand("spectate", carrierid + "");
                    // TODO: if the carrier dies, go in free camera mode
                    // function carrierKilled(data, dead, killer){
                    SWAM.on("playerKilled", function(data, dead, killer){
                        if (dead.id == carrierid)
                            {
                                // the carrier died
                                console.log(carriername + " died");
                                //Network.sendCommand("spectate", game.myID + "");
                                $("#btnFreeSpectator").click();
                            }
                    });
                    
                }
                else {
                    // probably returned
                    // TODO: free camera to blue base
                }
            } else if ( team === 2 && chaseflag === 2) {

                // var carriername = $( "#redflag-name" ).text();
                //var carrierid = 
                var carriername = $( "#redflag-name" ).justtext();
                console.log("flag red " + carriername);
                if (carriername.length > 0){
                    //Network.sendCommand("/Spectate " + carriername);
                    carrierobj = Players.getByName(carriername); 
                    carrierid = carrierobj['id']; 
                    Network.sendCommand("spectate", carrierid + "");
                    // TODO: if the carrier dies, go in free camera mode
                    // function carrierKilled(data, dead, killer){
                    SWAM.on("playerKilled", function(data, dead, killer){
                        if (dead.id == carrierid)
                            {
                                // the carrier died
                                console.log(carriername + " died");
                                //Network.sendCommand("spectate", game.myID + "");
                                $("#btnFreeSpectator").click();
                            }
                    });
                }
                else {
                    // probably returned
                    // TODO: free camera to red base
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
    
}());