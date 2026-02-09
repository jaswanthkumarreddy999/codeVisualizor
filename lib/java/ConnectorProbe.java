import com.sun.jdi.Bootstrap;
import com.sun.jdi.connect.Connector;
import com.sun.jdi.connect.ListeningConnector;
import java.util.Map;

public class ConnectorProbe {
    public static void main(String[] args) {
        System.out.println("Available Listening Connectors:");
        for (ListeningConnector lc : Bootstrap.virtualMachineManager().listeningConnectors()) {
            System.out.println("Connector: " + lc.name());
            System.out.println("  Description: " + lc.description());
            for (Map.Entry<String, Connector.Argument> entry : lc.defaultArguments().entrySet()) {
                System.out.println("    Arg: " + entry.getKey() + " (Label: " + entry.getValue().label() + ")");
            }
            System.out.println("--------------------------------------------------");
        }
    }
}
