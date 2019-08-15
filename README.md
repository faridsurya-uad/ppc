# PROGRESSIVE PIE CHART
Progressive Pie Chart (PPC) for data presentation with progression
## INSTALLATION
Include the **ppc.js** file to your project. Create element with id attribute. For example: ```<div id="container"></div>```. Create javascript code to pass the data:

```javascript

<!DOCTYPE html>
<html>
   <head>
      <title>Progressive Pie Chart</title>
     <script type="text/javascript" src="ppc.js"></script>    
   <head>
   <body>
      <div id="container"></div>
      <script>
        var container=document.getElementById('container');
        var chart=new Ppc(container);
        var data={
            current:[ [ "Merapi", 150 ], [ "Slamet", 170 ], [ "Ragajombangan", 80 ]],
            total:2345,
            title:'Progressive Pie Chart'
         };
        chart.draw(data);
     </script>
   </body>
</html>

```

