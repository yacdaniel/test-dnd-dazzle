<#function add a, b>
	<#return a+b />
</#function>

<#macro makePretty color>
	<div style="border: 10px solid ${color};">
      <#nested />
    </div>
</#macro>

<#macro mapSupport>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
      <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhRuMVKGWoahp2nCs67kGjdxiendBWfRM&callback=initMap"
      type="text/javascript"></script>
    
   <script>
   function initMap(id, address) {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
      
   function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
      </script>
</#macro>


<#macro map id address>
	<div id="${id}" style='border:1px solid black; width: 300px; height: 200px;'></div>
    	<script>
          google.maps.event.addDomListener(window, 'load', function() { 
         initMap();
          );
        </script>
</#macro>