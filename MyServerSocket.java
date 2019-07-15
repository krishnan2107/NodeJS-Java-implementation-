import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.UnknownHostException;

public class MyServerSocket {
	
	private ServerSocket server;
	
	
	public MyServerSocket(String ipAddress) throws UnknownHostException, IOException {
		String def = "192.168.32.134";
		if (ipAddress!=null && ipAddress.isEmpty())
			this.server = new ServerSocket(7777,1,InetAddress.getByName(ipAddress));
		else
			this.server = new ServerSocket(7777,1,InetAddress.getByName(def));
//			this.server = new ServerSocket(7777,1,InetAddress.getLocalHost());
		
	}
	
	private void listen() throws Exception {
		String data = null;
		Socket client = this.server.accept();
		String clientAddress = client.getInetAddress().getHostAddress();
		PrintWriter out = new PrintWriter(client.getOutputStream(),true);
		
		System.out.println("\r\nNew Connection from : "+clientAddress);
		
		BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
		
		while((data=in.readLine())!=null) {
			System.out.println("\r\nMessage from "+clientAddress+":"+data);
			String[] temp = data.toString().trim().split(",");
			System.out.println("\r\n"+temp.length);
			double total = 0;
			for(int i =0;i<temp.length;i++) {
				total+=Integer.parseInt(temp[i]);
				System.out.println("\r\n"+temp[i]);
				}
			System.out.println("\r\n"+total);
			out.println(total);
			out.close();
			
		}
	}
	
	private InetAddress getSocketAddres() {
		return this.server.getInetAddress();
	}
	
	private int getPort() {
		return this.server.getLocalPort();
	}
	
	public static void main(String[] args) throws Exception {
		MyServerSocket app = new MyServerSocket("192.168.32.134");
		
		System.out.println("\r\nRunning Server: "
				+ "Host= "+app.getSocketAddres().getHostAddress()
				+ " Port="+app.getPort());
		
		while(true)
			app.listen();
	}
	

}
