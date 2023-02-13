mapboxgl.accessToken =
    'pk.eyJ1IjoiaG9taW5oZHVjMTgiLCJhIjoiY2xlMmpsbnA1MXY2NDNybnZhOGk3Z216MiJ9.YrHRleilK6B7KEt6dEcMGQ';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true,
});

function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
    setupMap([28.61, 77.20]);
}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map', // map hiển thị
        style: 'mapbox://styles/mapbox/streets-v11',//style URL có thể điều chỉnh theo ý 
        center: center, // điểm trung tâm khi map hiên thi lên
        zoom: 100,//hien thi tọa độ lên map
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);
    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
    });

data = {
    "type": "FeatureCollection",
    "features": [{
        type: "Feature",
        geometry: {
            type: "Point",
        }
    }],
}


    map.addControl(directions, 'top-left'); // hiên thị nhập tọa độ 
}