### RESUMEN

Este proyecto pretende crear un sistema hub potenciado con IA para resolver tareas diarias y workflows con la menor fricción posible se compone de varias carpetas cada una con su responsabilidad:

- Infrastructure: Mantiene el codigo ejecutable del sistema, dockers, scripts, configuraciones, cada uno agrupado en su modulo correspondiente, siendo core el transversal
- Brains: Módulo reservado para claude project, aqui se irá definiendo el sistema, añadiendo ideas e información necesaria para el proyecto, la idea es que claude lea esa carpeta para tener contexto sobre el proyecto y además, de manera iterativa pueda actualizarse con cada sesión
- Archive: Documentos, ideas o demás elementos completados o descartados, pero de los que se quiere tener traza.
